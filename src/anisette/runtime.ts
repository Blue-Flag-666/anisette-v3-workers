/// <reference path="../generated.d.ts" />

import {
  Anisette as AnisetteValue,
  ModuleFactory,
  WasmBridge as WasmBridgeValue,
} from "../vendor/anisette.js";
import wasmModule from "../vendor/anisette.wasm";
import { fromBase64, toBase64 } from "./utils.js";

type EmscriptenModule = Record<string, unknown>;

interface StartProvisioningResult {
  cpim: Uint8Array;
  session: number;
}

interface RequestOtpResult {
  otp: Uint8Array;
  machineId: Uint8Array;
}

interface AnisetteInstance {
  isProvisioned: boolean;
  provision(): Promise<void>;
  getData(): Promise<Record<string, string>>;
  getAdiPb(): Uint8Array;
  getDeviceJson(): Uint8Array;
}

interface WasmBridgeInstance {
  startProvisioning(dsid: bigint, spim: Uint8Array): StartProvisioningResult;
  endProvisioning(session: number, ptm: Uint8Array, tk: Uint8Array): void;
  requestOtp(dsid: bigint): RequestOtpResult;
  readVirtualFile(path: string): Uint8Array;
  writeVirtualFile(path: string, data: Uint8Array): void;
  initFromBlobs(
    storeservices: Uint8Array,
    coreadi: Uint8Array,
    libraryPath: string,
    provisioningPath: string,
    identifier: string,
  ): void;
}

const Anisette = AnisetteValue as {
  fromSo(
    storeservices: Uint8Array,
    coreadi: Uint8Array,
    runtime: EmscriptenModule,
    options: Record<string, unknown>,
  ): Promise<AnisetteInstance>;
};

const WasmBridge = WasmBridgeValue as new (
  runtime: EmscriptenModule,
) => WasmBridgeInstance;

export interface PersistedState {
  adiPb?: string;
  deviceJson?: string;
}

let initializationTail: Promise<void> = Promise.resolve();

async function serializeInitialization<T>(operation: () => Promise<T>): Promise<T> {
  const previous = initializationTail;
  let release!: () => void;
  initializationTail = new Promise<void>((resolve) => { release = resolve; });
  await previous;
  try {
    return await operation();
  } finally {
    release();
  }
}

async function instantiateRuntime(): Promise<EmscriptenModule> {
  return serializeInitialization(() => withWorkerGlobals(async () => {
    return await ModuleFactory({
      FS: undefined,
      instantiateWasm(
        imports: WebAssembly.Imports,
        receive: (instance: WebAssembly.Instance) => void,
      ) {
        void WebAssembly.instantiate(wasmModule, imports).then(receive);
        return {};
      },
    }) as EmscriptenModule;
  }));
}

async function withWorkerGlobals<T>(operation: () => Promise<T>): Promise<T> {
  const global = globalThis as Record<string, unknown>;
  const keys = ["process", "WorkerGlobalScope", "window", "indexedDB"] as const;
  const descriptors = new Map<string, PropertyDescriptor | undefined>();
  for (const key of keys) descriptors.set(key, Object.getOwnPropertyDescriptor(global, key));

  const define = (key: string, value: unknown) => {
    Object.defineProperty(global, key, { value, configurable: true, writable: true });
  };

  define("process", undefined);
  define("WorkerGlobalScope", undefined);
  define("window", {});
  define("indexedDB", undefined);

  try {
    return await operation();
  } finally {
    for (const key of keys) {
      const descriptor = descriptors.get(key);
      if (descriptor) Object.defineProperty(global, key, descriptor);
      else delete global[key];
    }
  }
}

async function loadLibraries(assets: Fetcher): Promise<[Uint8Array, Uint8Array]> {
  return Promise.all([
    loadAsset(assets, "/libstoreservicescore.so"),
    loadAsset(assets, "/libCoreADI.so"),
  ]);
}

async function loadAsset(assets: Fetcher, path: string): Promise<Uint8Array> {
  const response = await assets.fetch(`https://assets.internal${path}`);
  if (!response.ok) throw new Error(`Missing runtime asset ${path}: ${response.status}`);
  return new Uint8Array(await response.arrayBuffer());
}

export async function createAnisette(
  assets: Fetcher,
  state?: PersistedState,
): Promise<AnisetteInstance> {
  const [storeservicescore, coreadi] = await loadLibraries(assets);
  const runtime = await instantiateRuntime();
  return Anisette.fromSo(storeservicescore, coreadi, runtime, {
    init: {
      libraryPath: "./anisette/",
      provisioningPath: "./anisette/",
      ...(state?.adiPb ? { adiPb: fromBase64(state.adiPb) } : {}),
      ...(state?.deviceJson ? { deviceJsonBytes: fromBase64(state.deviceJson) } : {}),
    },
  });
}

export function serializeState(anisette: AnisetteInstance): PersistedState {
  return {
    adiPb: toBase64(anisette.getAdiPb()),
    deviceJson: toBase64(anisette.getDeviceJson()),
  };
}

export class CoreAdiSession {
  constructor(private readonly bridge: WasmBridgeInstance) {}

  startProvisioning(spim: Uint8Array): StartProvisioningResult {
    return this.bridge.startProvisioning(-2n, spim);
  }

  endProvisioning(session: number, ptm: Uint8Array, tk: Uint8Array): void {
    this.bridge.endProvisioning(session, ptm, tk);
  }

  requestOtp(): RequestOtpResult {
    return this.bridge.requestOtp(-2n);
  }

  readAdiPb(): Uint8Array {
    return this.bridge.readVirtualFile("./anisette/adi.pb");
  }
}

export async function createCoreAdiSession(
  assets: Fetcher,
  identifier: string,
  adiPb?: Uint8Array,
): Promise<CoreAdiSession> {
  const [storeservicescore, coreadi] = await loadLibraries(assets);
  const runtime = await instantiateRuntime();
  const bridge = new WasmBridge(runtime);
  if (adiPb) bridge.writeVirtualFile("./anisette/adi.pb", adiPb);
  bridge.initFromBlobs(
    storeservicescore,
    coreadi,
    "./anisette/",
    "./anisette/",
    identifier,
  );
  return new CoreAdiSession(bridge);
}
