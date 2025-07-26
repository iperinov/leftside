import { getAppConfig } from "~/lib/runtimeConfig";
import { mockConfigurationsJson } from "../mock/cbd/mockConfigurations";
import type { StoredConfig } from "../sccs/types.gen";
import type { CdbViewResponse, Configuration } from "./cdb.types";

export default async function getAllConfigurations(): Promise<StoredConfig[]> {
  const cdbUrl = getAppConfig().cdb.baseUrl;
  const auth = getAppConfig().cdb.auth;

  const url = new URL("/sccs/_design/config/_view/by_uuid", cdbUrl);
  console.log("getLeagues: ", cdbUrl, url);

  // MOCK:
  // await new Promise((res) => setTimeout(res, 500));
  // const data = JSON.parse(mockConfigurationsJson) as CdbViewResponse<Config>;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include", // Ensure cookies are sent if needed
  });

  if (!response.ok) {
    throw new Error("Failed to fetch catalog items");
  }
  const data: CdbViewResponse<StoredConfig> = await response.json();

  return data.rows.map((item) => item.value);
}
