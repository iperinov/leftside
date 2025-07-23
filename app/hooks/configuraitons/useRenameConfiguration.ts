import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { renameConfigMutation, renameConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { RenameConfigResponse } from "~/api/sccs/types.gen";

interface RenameConfigurationProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (data: RenameConfigResponse) => void;
  onSettled?: () => void;
}

export function useRenameConfiguration({ onError, onSuccess, onSettled }: RenameConfigurationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...renameConfigMutation(),
    onSuccess: (data, variables) => {
      const renamed = data as RenameConfigResponse;
      queryClient.invalidateQueries({ queryKey: renameConfigQueryKey(variables) });
      onSuccess?.(renamed);
    },
    onError: (error) => {
      onError?.(error);
    },
    onSettled: () => {
      onSettled?.();
    },
  });
}
