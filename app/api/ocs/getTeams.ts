import { getAppConfig } from "~/lib/runtimeConfig";
import { mockTeams } from "./mock/mockTeams";
import type { Team } from "./ocs.types";

const ocsUrl = getAppConfig().ocs.baseUrl;

export const getTeams = async (ids: number[]): Promise<Team[]> => {
  const url = new URL(`${ocsUrl}/config/teams`);
  console.log("getTeams: ", url);
  await new Promise((res) => setTimeout(res, 2000)); // Simulate delay

  // TODO:
  //    * Replace with real API call
  //    * Handle error codes
  // ids.forEach((id) => url.searchParams.append('id', id.toString()));

  // const response = await fetch(url.toString());

  // if (!response.ok) {
  //   const errorText = await response.text();
  //   throw new Error(`Failed to fetch teams: ${response.status} ${errorText}`);
  // }

  // const data: TeamFull[] = await response.json();
  // return data;

  return mockTeams;
};
