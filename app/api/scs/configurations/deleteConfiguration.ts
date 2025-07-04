import { getAppConfig } from "~/lib/runtimeConfig";
import type { DeleteConfigApiIn, DeleteConfigApiResponse } from "./config.types";

const scsUrl = getAppConfig().scs.baseUrl;

export const deleteConfiguration = async (input: DeleteConfigApiIn): Promise<DeleteConfigApiResponse> => {
  const url = `${scsUrl}/scs/config/${input.uuid}/delete`;
  console.log("delete config:", url, input);

  // const response = await fetch(url, {
  //   method: 'DELETE',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ rev: input.rev }),
  // });

  // if (!response.ok) {
  //   const errorText = await response.text();
  //   throw new Error(`Failed to delete configuration: ${response.status} ${errorText}`);
  // }

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
    rev: input.rev,

    // ExitCode: 101,
    // Description: "Configuration with same name already exists.",
  };
};
