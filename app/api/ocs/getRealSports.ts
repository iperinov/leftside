import { getAppConfig } from "~/lib/runtimeConfig";
import type { RealSport } from "./ocs.types";
import { mockSports } from "./mock/mockRealSports";

const ocsUrl = getAppConfig().ocs.baseUrl;

export const getRealSports = async (): Promise<RealSport[]> => {
  const url = new URL(`${ocsUrl}/config/realsports/`);
  console.log("getSports: ", url);

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

  await new Promise((res) => setTimeout(res, 1000)); // Simulate delay
  return mockSports;
};
