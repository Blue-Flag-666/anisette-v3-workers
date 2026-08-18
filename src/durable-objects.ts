import { DurableObject } from "cloudflare:workers";
import { handleGetHeaders, handleV1, V3ProvisioningProtocol } from "./protocol.js";

export class V1Machine extends DurableObject<Env> {
  private tail: Promise<void> = Promise.resolve();

  async fetch(request: Request): Promise<Response> {
    if (request.method !== "GET") return new Response("Method Not Allowed", { status: 405 });
    return this.exclusive(() => handleV1(this.env, this.ctx.storage));
  }

  private async exclusive<T>(operation: () => Promise<T>): Promise<T> {
    const previous = this.tail;
    let release!: () => void;
    this.tail = new Promise<void>((resolve) => { release = resolve; });
    await previous;
    try { return await operation(); } finally { release(); }
  }
}

export class V3Session extends DurableObject<Env> {
  async fetch(request: Request): Promise<Response> {
    if (request.method === "POST") return handleGetHeaders(request, this.env);
    if (request.method !== "GET" || request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
      return new Response("Expected POST or WebSocket upgrade", { status: 400 });
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    server.accept();
    void new V3ProvisioningProtocol(server, this.env).run();
    return new Response(null, { status: 101, webSocket: client });
  }
}
