import { getAppConfig } from "~/lib/runtimeConfig";
import { mockLeagueByEvent } from "./mock/mockLeagueByEvent";
import type { LeagueByEvent } from "./ocs.types";

const ocsUrl = getAppConfig().ocs.baseUrl;

export const getLeagueByEvent = async (
  rsids: number[] = [],
): Promise<LeagueByEvent[]> => {
  const url = new URL(`${ocsUrl}/config/leagues-by-events`);
  console.log("getLeagueByEvent: ", url);
  await new Promise((res) => setTimeout(res, 2000)); // Simulate delay

  // rsids.forEach((id) => url.searchParams.append('rsid', id.toString()));

  // const response = await fetch(url.toString());

  // if (!response.ok) {
  //   const errorText = await response.text();
  //   throw new Error(`Failed to fetch league-by-event mappings: ${response.status} ${errorText}`);
  // }

  // const data: LeagueByEvent[] = await response.json();
  // return data;

  return mockLeagueByEvent;
};
