import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateConfigMutation, duplicateConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { DuplicateConfigRequest, DuplicateConfigResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";
import { queryKeys } from "~/lib/queryKeys";

interface DuplicateConfigurationProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (response: DuplicateConfigResponse, request: DuplicateConfigRequest) => void;
  onSettled?: () => void;
}

export function useDuplicateConfiguration({ onError, onSuccess, onSettled }: DuplicateConfigurationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...duplicateConfigMutation({ client: client }),
    onSuccess: (data, variables) => {
      const response = data as DuplicateConfigResponse;
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
