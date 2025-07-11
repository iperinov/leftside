import { getAppConfig } from "~/lib/runtimeConfig";
import { mockLeagues } from "./mock/mockLeagues";
import type { League } from "./ocs.types";

const ocsUrl = getAppConfig().ocs.baseUrl;

export async function getLeagues(rsids: number[] = []): Promise<League[]> {
  const url = new URL("/config/leagues/", ocsUrl);
  console.log("getLeagues: ", url);
  await new Promise((res) => setTimeout(res, 500)); // Simulate delay

  // TODO:
  //    * Replace with real API call
  //    * Handle error codes
  // if (rsids.length > 0) {
  //   rsids.forEach((id) => url.searchParams.append("rsid", id.toString()));
  // }

  // const response = await fetch(url.toString());

  // if (!response.ok) {
  //   const errorText = await response.text();
  //   throw new Error(`Failed to fetch leagues: ${response.status} ${errorText}`);
  // }

  // return response.json();

  return mockLeagues;
}
