import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Defaults are sensible for App Router on Workers.
  // Add R2 incremental cache or Workers KV here if you want ISR caching.
});
