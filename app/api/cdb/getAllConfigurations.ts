import { getAppConfig } from "~/lib/runtimeConfig";
import type { CdbViewResponse, Configuration } from "./cdb.types";
import type { Config } from "../sccs/types.gen";
import { mockConfigurationsJson } from "../mock/cbd/mockConfigurations";


export default async function getAllConfigurations(): Promise<Config[]> {
  const cdbUrl = getAppConfig().cdb.baseUrl;
  const auth = getAppConfig().cdb.auth;

  const url = new URL("/sccs/_design/config/_view/by_uuid", cdbUrl);
  console.log("getLeagues: ", cdbUrl, url);

  // MOCK:
  await new Promise((res) => setTimeout(res, 500));
  const data = JSON.parse(mockConfigurationsJson) as CdbViewResponse<Config>;

  // const headers = new Headers();
  // if (auth) {
  //   hheaders.set("Authorization", `Basic ${btoa(`${auth.username}:${auth.password}`)}`);
  // }
  // const response = await fetch(url, {
  //   method: "GET",
  //   headers,
  // });

  // if (!response.ok) {
  //   throw new Error("Failed to fetch catalog items");
  // }
  //const data: CbdViewResponse<Configuration> = await response.json();

  return data.rows.map((item) => item.value);
}
