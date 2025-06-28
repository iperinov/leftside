import { getAppConfig } from "~/lib/runtimeConfig";
import { mockLeagues } from "./mock/mockLeagues";
import type { League } from "./ocs.types";

const ocsUrl = getAppConfig().ocs.baseUrl;

export async function getLeagues(sportIDs: number[] = []): Promise<League[]> {
  const url = new URL("/config/leagues/", ocsUrl);
  console.log("getLeagues: ", url);
  await new Promise((res) => setTimeout(res, 1000)); // Simulate delay

  // TODO:
  //    * Replace with real API call
  //    * Handle error codes
  // if (sportIDs.length > 0) {
  //   sportIDs.forEach((id) => url.searchParams.append("rsid", id.toString()));
  // }

  // const response = await fetch(url.toString());

  // if (!response.ok) {
  //   const errorText = await response.text();
  //   throw new Error(`Failed to fetch leagues: ${response.status} ${errorText}`);
  // }

  // return response.json();

  return mockLeagues;
}
