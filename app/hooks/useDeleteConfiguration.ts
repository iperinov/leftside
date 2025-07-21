import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../lib/queryKeys";

export interface DeleteConfig {
  uuid: string;
  rev: string;
}

export const useDeleteConfiguration = () => {
  // const queryClient = useQueryClient();

  // return useMutation<DeleteConfigApiSuccess, Error, DeleteConfigApiIn>({
  //   mutationFn: async ({ uuid, rev }) => {
  //     const result = await deleteConfiguration({ uuid, rev });

  //     if (result.ExitCode === ExitCodes.NotFound) {
  //       queryClient.invalidateQueries({ queryKey: queryKeys.configurations() });
  //       throw new Error("Description" in result ? result.Description : "Delete failed with unknown error");
  //     }

  //     if (result.ExitCode !== ExitCodes.Success) {
  //       throw new Error("Description" in result ? result.Description : "Delete failed with unknown error");
  //     }

  //     // Assign the successful result to a new variable with type assertion
  //     const success = result as Extract<typeof result, { ExitCode: 0 }>;

  //     return success;
  //   },
  //   onSuccess: (created) => {
  //     queryClient.invalidateQueries({ queryKey: queryKeys.configurations() });
  //     toast.success("Configuration deleted successfully");
  //   },
  //   onError: (error, _variables, context) => {
  //     toast.error("Failed to delete configuration");
  //     console.error(error);
  //   },
  // });
};
