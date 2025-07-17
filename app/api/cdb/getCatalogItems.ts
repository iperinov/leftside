import { getAppConfig } from "~/lib/runtimeConfig";
import type { CatalogItem, CdbViewResponse } from "./cdb.types";
//import { mockCatalogItemsJson } from "./mock/mockCatalogItems";

const cdbUrl = getAppConfig().cdb.baseUrl;
const auth = getAppConfig().cdb.auth;

export default async function getCatalogItems(): Promise<CatalogItem[]> {
  const url = new URL("/sccs/_design/catalogue/_view/by_league", cdbUrl);
  console.log("getLeagues: ", cdbUrl, url);

  // MOCK: await new Promise((res) => setTimeout(res, 500));
  // MOCK: const data = JSON.parse(mockCatalogItemsJson) as CdbViewResponse<CatalogItem>;
  const headers = new Headers();
  if (auth) {
    headers.set("Authorization", `Basic ${auth.username}:${auth.password}`);
  }
  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch catalog items");
  }

  const data: CdbViewResponse<CatalogItem> = await response.json();
  return data.rows.map((item) => item.value);
}
