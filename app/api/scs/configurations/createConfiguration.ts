import { getAppConfig } from "~/lib/runtimeConfig";
import type { CreateConfigApiIn, CreateConfigApiResponse } from "./config.types";

const scsUrl = getAppConfig().scs.baseUrl;

export const createConfiguration = async (input: CreateConfigApiIn): Promise<CreateConfigApiResponse> => {
  const url = `${scsUrl}/scs/config/`;
  console.log("create config: ", url, input);

  // const response = await fetch(url, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(input),
  // });

  // if (!response.ok) {
  //   const errorText = await response.text();
  //   throw new Error(`Failed to create configuration: ${response.status} ${errorText}`);
  // }

  // const data: CreateConfigApiResponse = await response.json();
  // return data;

  // Mock success response
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    ExitCode: 0,
    uuid: "09bef6e0-351d-4065-922a-6ce6241a1d85",
    rev: "14-f04499aa1dc7258169beeb08b6ab78b6",
    name: "new_name",
    categories: [],

    // ExitCode: 101,
    // Description: "Configuration with same name already exists.",
  };
};
