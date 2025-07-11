import { getAppConfig } from "~/lib/runtimeConfig";
import type { Configuration } from "./config.types";
import { mockConfigurations } from "./mock/mockConfigurations";

const scsUrl = getAppConfig().scs.baseUrl;

export const getConfigurations = async (): Promise<Configuration[]> => {
  const url = new URL(`${scsUrl}/configs`);
  console.log("get config: ", url);
  // TODO:
  //    * Replace with real API call
  //    * Handle error codes
  // const response = await fetch('${url}');

  // if (!response.ok) {
  //   const errorText = await response.text();
  //   throw new Error(`Failed to fetch configurations: ${response.status} ${errorText}`);
  // }

  // const data: Configuration[] = await response.json();
  // return data;

  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockConfigurations;
};
