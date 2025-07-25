import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateConfigMutation, updateConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { UpdateConfigRequest, UpdateConfigResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";

interface UpdateConfigurationProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (response: UpdateConfigResponse, request: UpdateConfigRequest) => void;
  onSettled?: () => void;
}

export function useUpdateConfiguration({ onError, onSuccess, onSettled }: UpdateConfigurationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...updateConfigMutation({client: client}),
    onSuccess: (data, variables) => {
      const response = data as UpdateConfigResponse;
      if (response.code !== 200) {
        onError?.(new Error(`Login failed: ${response.description}`));
      } else {
        queryClient.invalidateQueries({ queryKey: updateConfigQueryKey(variables) });
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
