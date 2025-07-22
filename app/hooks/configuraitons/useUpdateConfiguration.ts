import { useMutation, useQueryClient, type DefaultError } from "@tanstack/react-query";
import type { UpdateConfigResponse } from "~/api/sccs/types.gen";
import { updateConfigMutation, updateConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";

interface UpdateConfigurationProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (data: UpdateConfigResponse) => void;
  onSettled?: () => void;
}

export function useUpdateConfiguration({ onError, onSuccess, onSettled }: UpdateConfigurationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...updateConfigMutation(),
    onSuccess: (data, variables) => {
      const updated = data as UpdateConfigResponse;
      queryClient.invalidateQueries({ queryKey: updateConfigQueryKey(variables) });
      onSuccess?.(updated);
    },
    onError: (error) => {
      onError?.(error);
    },
    onSettled: () => {
      onSettled?.();
    },
  });
};
