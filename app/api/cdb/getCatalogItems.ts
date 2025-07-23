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

  const response = await fetch(url, {
    method: "GET",
    credentials: 'include', // Ensure cookies are sent if needed
  });

  if (!response.ok) {
    throw new Error("Failed to fetch catalog items");
  }
  const data: CdbViewResponse<CatalogItem> = await response.json();

  return data.rows.map((item) => item.value);
}
