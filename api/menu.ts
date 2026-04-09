import { json, noStoreHeaders, staleWhileRevalidateHeaders } from "./_lib/security";
import { getCachedMenuItems } from "../src/lib/menu-data";

const CDN_S_MAXAGE_SECONDS = 300;
const CDN_STALE_WHILE_REVALIDATE_SECONDS = 600;

export default {
  async fetch(request: Request) {
    if (request.method !== "GET") {
      return json({ error: "Method not allowed" }, 405, {
        ...noStoreHeaders(),
        Allow: "GET",
      });
    }

    const items = getCachedMenuItems();

    return json(
      {
        ok: true,
        data: items,
        count: items.length,
      },
      200,
      staleWhileRevalidateHeaders(
        CDN_S_MAXAGE_SECONDS,
        CDN_STALE_WHILE_REVALIDATE_SECONDS,
        0
      )
    );
  },
};
