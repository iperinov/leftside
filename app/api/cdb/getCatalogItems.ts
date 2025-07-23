import { getAppConfig } from "~/lib/runtimeConfig";
import type { CatalogItem, CdbViewResponse } from "./cdb.types";
//import { mockCatalogItemsJson } from "./mock/mockCatalogItems";

export default async function getCatalogItems(): Promise<CatalogItem[]> {
  const cdbUrl = getAppConfig().cdb.baseUrl;
  const auth = getAppConfig().cdb.auth;

  const url = new URL("/sccs/_design/catalogue/_view/by_league", cdbUrl);
  console.log("getLeagues: ", cdbUrl, url);

  // MOCK:
  // await new Promise((res) => setTimeout(res, 500));
  // const data = JSON.parse(mockCatalogItemsJson) as CdbViewResponse<CatalogItem>;

  const headers = new Headers();
  if (auth) {
    headers.set("Authorization", `Basic ${btoa(`${auth.username}:${auth.password}`)}`);
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
