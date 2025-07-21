import { getAppConfig } from "~/lib/runtimeConfig";
import type { Config } from "../sccs/types.gen";
import { mockConfigurationCategoriesJson } from "./mock/mockCategories";
import type { CdbViewResponse } from "./cdb.types";

export const getConfiguration = async (configID: string): Promise<Config> => {
  const cdbUrl = getAppConfig().cdb.baseUrl;
  const auth = getAppConfig().cdb.auth;

  const url = new URL("/sccs/_design/config/_view/by_uuid", cdbUrl);
  console.log("getCategories: ", cdbUrl, url);

  // MOCK:
  await new Promise((res) => setTimeout(res, 500));
  const data = JSON.parse(mockConfigurationCategoriesJson) as CdbViewResponse<Config>;
  
  // const headers = new Headers();
  // if (auth) {
  //   headers.set("Authorization", `Basic ${btoa(`${auth.username}:${auth.password}`)}`);
  // }
  // const response = await fetch(url, {
  //   method: "GET",
  //   headers,
  // });

  // if (!response.ok) {
  //   throw new Error("Failed to fetch catalog items");
  // }
  //const data: CdbViewResponse<CatalogItem> = await response.json();
  
  return data.rows[0].value;
};
