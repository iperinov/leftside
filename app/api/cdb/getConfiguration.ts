import { getAppConfig } from "~/lib/runtimeConfig";
import { mockConfigurationCategoriesJson } from "../mock/cbd/mockConfiguration";
import type { StoredConfig } from "../sccs/types.gen";
import type { CdbViewResponse } from "./cdb.types";

export const getConfiguration = async (configID: string): Promise<StoredConfig> => {
  const cdbUrl = getAppConfig().cdb.baseUrl;
  const auth = getAppConfig().cdb.auth;

  const url = new URL(`/sccs/_design/config/_view/by_uuid?key=${configID}`, cdbUrl);
  console.log("getCategories: ", cdbUrl, url);

  // MOCK:
  // await new Promise((res) => setTimeout(res, 500));
  // const data = JSON.parse(mockConfigurationCategoriesJson) as CdbViewResponse<StoredConfig>;

  const response = await fetch(url, {
    method: "GET",
    credentials: 'include', // Ensure cookies are sent if needed
  });

  if (!response.ok) {
    throw new Error("Failed to fetch catalog items");
  }
  const data: CdbViewResponse<StoredConfig> = await response.json();

  return data.rows[0].value;
};
