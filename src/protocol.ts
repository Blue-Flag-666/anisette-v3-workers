import { createAnisette, createCoreAdiSession, serializeState, type PersistedState } from "./anisette/runtime.js";
import { fromBase64, toBase64 } from "./anisette/utils.js";

export const CLIENT_INFO = "<MacBookPro13,2> <macOS;13.1;22C65> <com.apple.AuthKit/1 (com.apple.dt.Xcode/3594.4.19)>";
export const USER_AGENT = "akd/1.0 CFNetwork/808.1.4";
export const IMPLEMENTATION_VERSION = "anisette-v3-workers source";
const MD_RINFO = "17106176";
const MESSAGE_TIMEOUT_MS = 3_000;
const MAX_REQUEST_CHARS = 256 * 1024;

type JsonObject = Record<string, unknown>;

export function jsonResponse(body: JsonObject, status = 200): Response {
  return Response.json(body, {
    status,
    headers: { "Implementation-Version": IMPLEMENTATION_VERSION },
  });
}

export function clientInfoResponse(): Response {
  return jsonResponse({ client_info: CLIENT_INFO, user_agent: USER_AGENT });
}

export async function handleV1(env: Env, storage: DurableObjectStorage): Promise<Response> {
  const state = await storage.get<PersistedState>("machine");
  const anisette = await createAnisette(env.ASSETS, state);
  if (!anisette.isProvisioned) await anisette.provision();
  const headers = await anisette.getData();
  await storage.put("machine", serializeState(anisette));

  return jsonResponse({
    "X-Apple-I-Client-Time": headers["X-Apple-I-Client-Time"],
    "X-Apple-I-MD": headers["X-Apple-I-MD"],
    "X-Apple-I-MD-M": headers["X-Apple-I-MD-M"],
    "X-Apple-I-MD-RINFO": MD_RINFO,
    "X-Apple-I-MD-LU": headers["X-Apple-I-MD-LU"],
    "X-Apple-I-SRL-NO": "0",
    "X-MMe-Client-Info": CLIENT_INFO,
    "X-Apple-I-TimeZone": headers["X-Apple-I-TimeZone"],
    "X-Apple-Locale": "en_US",
    "X-Mme-Device-Id": headers["X-Mme-Device-Id"],
  });
}

export async function handleGetHeaders(request: Request, env: Env): Promise<Response> {
  try {
    const body = await readJson(request);
    const identifierBytes = decodeField(body, "identifier", 64);
    const adiPb = decodeField(body, "adi_pb", 128 * 1024);
    if (identifierBytes.length < 16) throw new Error("identifier must contain 16 bytes");

    const identifier = bytesToUuid(identifierBytes.subarray(0, 16));
    const coreIdentifier = identifier.toUpperCase().slice(0, 16);
    const session = await createCoreAdiSession(env.ASSETS, coreIdentifier, adiPb);
    const result = session.requestOtp();
    return jsonResponse({
      result: "Headers",
      "X-Apple-I-MD": toBase64(result.otp),
      "X-Apple-I-MD-M": toBase64(result.machineId),
      "X-Apple-I-MD-RINFO": MD_RINFO,
    });
  } catch (error) {
    return jsonResponse({ result: "GetHeadersError", message: errorMessage(error) });
  }
}

export class V3ProvisioningProtocol {
  private closed = false;

  constructor(
    private readonly socket: WebSocket,
    private readonly env: Env,
  ) {}

  async run(): Promise<void> {
    try {
      this.send({ result: "GiveIdentifier" });
      let identifier: string;
      try {
        const identifierMessage = await this.nextJson();
        const identifierBytes = decodeField(identifierMessage, "identifier", 64);
        if (identifierBytes.length < 16) throw new Error("identifier must contain 16 bytes");
        identifier = bytesToUuid(identifierBytes.subarray(0, 16)).toUpperCase().slice(0, 16);
      } catch (error) {
        this.sendStageError("InvalidIdentifier", error);
        return;
      }

      let core: Awaited<ReturnType<typeof createCoreAdiSession>>;
      let started: ReturnType<typeof core.startProvisioning>;
      try {
        core = await createCoreAdiSession(this.env.ASSETS, identifier);
        this.send({ result: "GiveStartProvisioningData" });
        const startMessage = await this.nextJson();
        started = core.startProvisioning(decodeField(startMessage, "spim", 128 * 1024));
        this.send({ result: "GiveEndProvisioningData", cpim: toBase64(started.cpim) });
      } catch (error) {
        this.sendStageError("StartProvisioningError", error);
        return;
      }

      try {
        const endMessage = await this.nextJson();
        core.endProvisioning(
          started.session,
          decodeField(endMessage, "ptm", 128 * 1024),
          decodeField(endMessage, "tk", 128 * 1024),
        );
        this.send({ result: "ProvisioningSuccess", adi_pb: toBase64(core.readAdiPb()) });
      } catch (error) {
        this.sendStageError("EndProvisioningError", error);
      }
    } finally {
      this.close();
    }
  }

  private send(value: JsonObject): void {
    if (!this.closed) this.socket.send(JSON.stringify(value));
  }

  private sendStageError(result: string, error: unknown): void {
    const message = errorMessage(error);
    if (message === "__TIMEOUT__") this.send({ result: "Timeout" });
    else if (message !== "__CLOSED__") this.send({ result, message });
  }

  private nextJson(): Promise<JsonObject> {
    return new Promise((resolve, reject) => {
      const cleanup = () => {
        clearTimeout(timer);
        this.socket.removeEventListener("message", onMessage);
        this.socket.removeEventListener("close", onClose);
        this.socket.removeEventListener("error", onClose);
      };
      const onMessage = (event: MessageEvent) => {
        cleanup();
        try {
          const text = typeof event.data === "string" ? event.data : new TextDecoder().decode(event.data);
          if (text.length > MAX_REQUEST_CHARS) throw new Error("WebSocket message too large");
          resolve(JSON.parse(text) as JsonObject);
        } catch (error) { reject(error); }
      };
      const onClose = () => { cleanup(); reject(new Error("__CLOSED__")); };
      const timer = setTimeout(() => { cleanup(); reject(new Error("__TIMEOUT__")); }, MESSAGE_TIMEOUT_MS);
      this.socket.addEventListener("message", onMessage);
      this.socket.addEventListener("close", onClose);
      this.socket.addEventListener("error", onClose);
    });
  }

  private close(): void {
    if (this.closed) return;
    this.closed = true;
    try { this.socket.close(1000, "Done"); } catch {}
  }
}

async function readJson(request: Request): Promise<JsonObject> {
  const declared = Number(request.headers.get("Content-Length") ?? 0);
  if (declared > MAX_REQUEST_CHARS) throw new Error("Request body too large");
  const text = await request.text();
  if (text.length > MAX_REQUEST_CHARS) throw new Error("Request body too large");
  return JSON.parse(text) as JsonObject;
}

function decodeField(body: JsonObject, name: string, maxBytes: number): Uint8Array {
  const value = body[name];
  if (typeof value !== "string") throw new Error(`${name} must be base64 text`);
  if (value.length > Math.ceil(maxBytes * 4 / 3) + 4) throw new Error(`${name} is too large`);
  const decoded = fromBase64(value);
  if (decoded.length > maxBytes) throw new Error(`${name} is too large`);
  return decoded;
}

function bytesToUuid(bytes: Uint8Array): string {
  const hex = Array.from(bytes, (value) => value.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
