import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { renameConfigMutation } from "~/api/sccs/@tanstack/react-query.gen";
import type { RenameConfigRequest, RenameConfigResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";
import { queryKeys } from "~/lib/queryKeys";

interface RenameConfigurationProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (response: RenameConfigResponse, request: RenameConfigRequest) => void;
  onSettled?: () => void;
}

export function useRenameConfiguration({ onError, onSuccess, onSettled }: RenameConfigurationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...renameConfigMutation({ client: client }),
    onSuccess: (data, variables) => {
      const response = data as RenameConfigResponse;
      if (response.code !== 200) {
        onError?.(new Error(`Rename configuration failed with code (${response.code}): ${response.description}`));
      } else {
        queryClient.invalidateQueries({ queryKey: queryKeys.configurations() });
        onSuccess?.(response, variables.body);
      }
    },
    onError: (error) => {
      onError?.(error);
    },
    onSettled: () => {
      onSettled?.();
    },
  });
}
