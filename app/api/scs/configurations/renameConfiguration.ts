import { getAppConfig } from "~/lib/runtimeConfig";
import type { RenameConfigApiIn, RenameConfigApiResponse } from "./config.types";

const scsUrl = getAppConfig().scs.baseUrl;

export const renameConfiguration = async (input: RenameConfigApiIn): Promise<RenameConfigApiResponse> => {
  const url = `${scsUrl}/scs/config/${input.uuid}/rename`;
  console.log("rename config: ", url, input);

  // TODO:
  //    * Replace with real API call
  //    * Handle error codes
  // const response = await fetch(url, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ name: input.name, rev: input.rev }),
  // });

  // if (!response.ok) {
  //   const errorText = await response.text();
  //   throw new Error(`Failed to rename configuration: ${response.status} ${errorText}`);
  // }

  // const data: RenameConfigApiResponse = await response.json();
  // return data;

  // Mock success response
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    ExitCode: 0,
    uuid: input.uuid,
    rev: input.rev,

    // ExitCode: 101,
    // Description: "Configuration with same name already exists.",
  };
};
