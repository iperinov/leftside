import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { renameConfigMutation, renameConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { RenameConfigRequest, RenameConfigResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";

interface RenameConfigurationProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (response: RenameConfigResponse, request: RenameConfigRequest) => void;
  onSettled?: () => void;
}

export function useRenameConfiguration({ onError, onSuccess, onSettled }: RenameConfigurationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...renameConfigMutation({client: client}),
    onSuccess: (data, variables) => {
      const response = data as RenameConfigResponse;
      if (response.code !== 200) {
        onError?.(new Error(`Login failed: ${response.description}`));
      } else {
        queryClient.invalidateQueries({ queryKey: renameConfigQueryKey(variables) });
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
