import { clientInfoResponse } from "./protocol.js";
import { V1Machine, V3Session } from "./durable-objects.js";

export { V1Machine, V3Session };

const SIDESTORE_SERVERS_URL = "https://servers.sidestore.io/servers.json";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/v3/client_info" && request.method === "GET") {
      return clientInfoResponse();
    }

    if (url.pathname === "/servers.json" && request.method === "GET") {
      return serversResponse(url);
    }

    if (url.pathname === "/" && request.method === "GET") {
      return env.V1_MACHINE.get(env.V1_MACHINE.idFromName("default")).fetch(request);
    }

    if (url.pathname === "/v3/get_headers" && request.method === "POST") {
      return env.V3_SESSIONS.get(env.V3_SESSIONS.newUniqueId()).fetch(request);
    }

    if (url.pathname === "/v3/provisioning_session" && request.method === "GET") {
      if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
        return new Response("Expected WebSocket upgrade", { status: 400 });
      }
      return env.V3_SESSIONS.get(env.V3_SESSIONS.newUniqueId()).fetch(request);
    }

    return new Response("Not Found", { status: 404 });
  },
};

async function serversResponse(url: URL): Promise<Response> {
  try {
    const upstream = await fetch(SIDESTORE_SERVERS_URL);
    if (!upstream.ok) throw new Error(`SideStore returned HTTP ${upstream.status}`);

    const list = await upstream.json<{
      servers?: Array<{ name?: unknown; address?: unknown }>;
      [key: string]: unknown;
    }>();
    const servers = Array.isArray(list.servers) ? list.servers : [];
    const currentServer = { name: url.hostname, address: url.origin };

    return Response.json({
      ...list,
      servers: [
        ...servers.filter((server) => server.address !== currentServer.address),
        currentServer,
      ],
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=600",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json({ error: `Unable to load SideStore servers: ${message}` }, {
      status: 502,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
}
