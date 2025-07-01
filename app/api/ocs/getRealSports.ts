import { getAppConfig } from "~/lib/runtimeConfig";
import { mockRealSports } from "./mock/mockRealSports";
import type { RealSport } from "./ocs.types";

const ocsUrl = getAppConfig().ocs.baseUrl;

export const getRealSports = async (): Promise<RealSport[]> => {
  const url = new URL(`${ocsUrl}/config/realsports/`);
  console.log("getRealSports: ", url);

  // TODO:
  //    * Replace with real API call
  //    * Handle error codes
  //   const response = await fetch(url);
  //   if (!response.ok) {
  //     const errorText = await response.text();
  //     throw new Error(`Failed to fetch real sports: ${response.status} ${errorText}`);
  //   }

  //   const data: RealSport[] = await response.json();
  //   return data;

  await new Promise((res) => setTimeout(res, 2000)); // Simulate delay
  return mockRealSports;
};
