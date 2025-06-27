import { getAppConfig } from "~/lib/runtimeConfig";
import type { Configuration } from "./getConfigurations";

const scsUrl = getAppConfig().scs.baseUrl;

export const updateConfiguration = async (
  input: Configuration,
): Promise<Configuration> => {
  const url = new URL(`${scsUrl}/configurations/${input.uuid}`);
  console.log("rename config: ", url, input);
  // TODO:
  //    * Replace with real API call
  //    * Handle error codes
  // const response = await fetch(`${url}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(updated),
  // });
  // return await response.json();

  await new Promise((res) => setTimeout(res, 1000)); // simulate delay

  return {
    ...input,
    lmt: Date.parse(new Date().toLocaleString()),
    lmu: "creator_user",
  };
};
