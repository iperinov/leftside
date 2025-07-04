import { type UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ExitCodes } from "../api/scs/configurations/config.exitCodes";
import type { CreateConfigApiIn, CreateConfigApiSuccess } from "../api/scs/configurations/config.types";
import { createConfiguration } from "../api/scs/configurations/createConfiguration";
import { queryKeys } from "../lib/queryKeys";

export interface CreateConfigInput {
  name: string;
}

export const useCreateConfiguration = (options?: UseMutationOptions<CreateConfigApiSuccess, Error, CreateConfigApiIn>) => {
  const queryClient = useQueryClient();
  return useMutation<CreateConfigApiSuccess, Error, CreateConfigApiIn>({
    mutationFn: async ({ name }) => {
      const result = await createConfiguration({ name });

      if (result.ExitCode === ExitCodes.NameExists) {
        queryClient.invalidateQueries({ queryKey: queryKeys.configurations() });
        throw new Error("Description" in result ? result.Description : "Rename failed with unknown error");
      }

      if (result.ExitCode !== ExitCodes.Success) {
        throw new Error("Description" in result ? result.Description : "Rename failed with unknown error");
      }

      // Assign the successful result to a new variable with type assertion
      const success = result as Extract<typeof result, { ExitCode: 0 }>;

      return success;
    },
    ...options,
  });
};
