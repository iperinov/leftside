import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ExitCodes } from "../api/scs/configurations/config.exitCodes";
import type { RenameConfigApiIn, RenameConfigApiSuccess } from "../api/scs/configurations/config.types";
import { renameConfiguration } from "../api/scs/configurations/renameConfiguration";
import { queryKeys } from "../lib/queryKeys";

export const useRenameConfiguration = () => {
  const queryClient = useQueryClient();

  return useMutation<RenameConfigApiSuccess, Error, RenameConfigApiIn>({
    mutationFn: async ({ uuid, rev, name }) => {
      const result = await renameConfiguration({ uuid, rev, name });

      if (result.ExitCode === ExitCodes.NotFound || result.ExitCode === ExitCodes.AlreadyChanged) {
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
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.configurations() });
      toast.success("Configuration renamed successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to rename configuration");
      console.error(error);
    },
  });
};
