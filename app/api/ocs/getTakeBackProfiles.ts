import { getAppConfig } from "~/lib/runtimeConfig";
import { mockTakeBackProfiles } from "./mock/mockTakeBackProfiles";
import type { TakeBackProfile } from "./ocs.types";

const ocsUrl = getAppConfig().ocs.baseUrl;

export const getTakeBackProfiles = async (): Promise<TakeBackProfile[]> => {
  const url = new URL(`${ocsUrl}/config/take-back-profiles/`);
  console.log("getTakeBackProfiles: ", url);
  await new Promise((res) => setTimeout(res, 2000)); // Simulate delay

  // TODO:
  //    * Replace with real API call
  //    * Handle error codes
  // const response = await fetch(url.toString());

  // if (!response.ok) {
  //   const errorText = await response.text();
  //   throw new Error(`Failed to fetch take-back profiles: ${response.status} ${errorText}`);
  // }

  // const data: TakeBackProfile[] = await response.json();
  // return data;

  return mockTakeBackProfiles;
};
