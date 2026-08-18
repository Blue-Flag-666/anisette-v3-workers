interface Env {
  ASSETS: Fetcher;
  V1_MACHINE: DurableObjectNamespace<import("./durable-objects").V1Machine>;
  V3_SESSIONS: DurableObjectNamespace<import("./durable-objects").V3Session>;
}
