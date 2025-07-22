import { useMutation, useQueryClient, type DefaultError } from "@tanstack/react-query";
import { duplicateConfigMutation, duplicateConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { DuplicateConfigResponse } from "~/api/sccs/types.gen";

interface DuplicateConfigurationProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (data: DuplicateConfigResponse) => void;
  onSettled?: () => void;
}

export function useDuplicateConfiguration({ onError, onSuccess, onSettled }: DuplicateConfigurationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...duplicateConfigMutation(),
    onSuccess: (data, variables) => {
      const duplicated = data as DuplicateConfigResponse;
      queryClient.invalidateQueries({ queryKey: duplicateConfigQueryKey(variables) });
      onSuccess?.(duplicated);
    },
    onError: (error) => {
      onError?.(error);
    },
    onSettled: () => {
      onSettled?.();
    },
  });
};
