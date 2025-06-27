import { getAppConfig } from "~/lib/runtimeConfig";
import type {
  DuplicateConfigApiIn,
  DuplicateConfigApiResponse,
} from "./config.types";

const scsUrl = getAppConfig().scs.baseUrl;

export const duplicateConfiguration = async (
  input: DuplicateConfigApiIn,
): Promise<DuplicateConfigApiResponse> => {
  const url = `${scsUrl}/scs/config/${input.uuid}/duplicate`;
  console.log("duplicate config:", url, input);

  // const response = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ rev: input.rev }),
  // });

  // if (!response.ok) {
  //   const errorText = await response.text();
  //   throw new Error(`Failed to duplicate configuration: ${response.status} ${errorText}`);
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
    uuid: input.uuid,
    rev: input.rev,
    name: "new_name",

    // ExitCode: 101,
    // Description: "Configuration with same name already exists.",
  };
};
