import { getAppConfig } from "~/lib/runtimeConfig";
import type { CatalogItem } from "./cdb.types";
import { mockCatalogItems } from "./mock/mockCatalogItems";

const cdbUrl = getAppConfig().cdb.baseUrl;

export default async function getCatalogItems(): Promise<CatalogItem[]> {
  const url = new URL("/config/leagues/", cdbUrl);
  console.log("getLeagues: ", url);
  await new Promise((res) => setTimeout(res, 2000)); // Simulate delay

  // TODO:

  return mockCatalogItems;
}
