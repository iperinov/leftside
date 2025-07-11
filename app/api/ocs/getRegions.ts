import { getAppConfig } from "~/lib/runtimeConfig";
import { mockLeagueRegions } from "./mock/mockRegions";
import type { LeagueRegion as Region } from "./ocs.types";

const ocsBaseUrl = getAppConfig().ocs.baseUrl;

export const getRegions = async (): Promise<Region[]> => {
  const url = new URL(`${ocsBaseUrl}/config/regions/`);
  console.log("getLeagueRegions: ", url);
  await new Promise((res) => setTimeout(res, 500)); // Simulate delay

  // TODO:
  //    * Replace with real API call
  //    * Handle error codes
  // TODO: Replace mock with real fetch
  // const response = await fetch(`${url}`);
  // if (!response.ok) {
  //   throw new Error(`Failed to fetch league regions: ${response.status}`);
  // }
  // return await response.json();

  return mockLeagueRegions;
};
