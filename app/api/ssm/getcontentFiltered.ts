import { getAppConfig } from "~/lib/runtimeConfig";
import { mockContentFiltered } from "./mock/mockContentFiltered";
import type { FilterGroup, FilteredGamesResponse } from "./ssm.types";

const ssmUrl = getAppConfig().ssm.baseUrl;

export const getContentFiltered = async (input: {
  filterGroups: FilterGroup[];
}): Promise<FilteredGamesResponse> => {
  const url = `${ssmUrl}/schedule/content/filtered`;
  console.log("getContentFiltered: ", url, input);
  await new Promise((res) => setTimeout(res, 2000)); // Simulate delay

  // TODO:
  //    * Replace with real API call
  //    * Handle error codes
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(input),
  //   });

  //   if (!response.ok) {
  //     const message = await response.text();
  //     throw new Error(`Failed to fetch filtered content: ${response.status} ${message}`);
  //   }

  //   const data: FilteredGamesResponse = await response.json();
  //   return data;

  return {
    status: 0,
    description: "OK",
    games: mockContentFiltered,
  };
};
