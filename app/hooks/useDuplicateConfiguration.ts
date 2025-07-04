import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ExitCodes } from "../api/scs/configurations/config.exitCodes";
import type { DuplicateConfigApiIn, DuplicateConfigApiSuccess } from "../api/scs/configurations/config.types";
import { duplicateConfiguration } from "../api/scs/configurations/duplicateConfiguration";
import { queryKeys } from "../lib/queryKeys";

export interface DuplicateConfigInput {
  uuid: string;
  rev: string;
}

export const useDuplicateConfiguration = () => {
  const queryClient = useQueryClient();

  return useMutation<DuplicateConfigApiSuccess, Error, DuplicateConfigApiIn>({
    mutationFn: async ({ uuid, rev }) => {
      const result = await duplicateConfiguration({ uuid, rev });

      if (result.ExitCode === ExitCodes.NotFound) {
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
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.configurations() });
      toast.success("Configuration duplicated successfully");
    },
    onError: (error, _variables, context) => {
      toast.error("Failed to duplicate configuration");
      console.error(error);
    },
  });
};
