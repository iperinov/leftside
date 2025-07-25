import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { createConfigMutation, createConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { CreateConfigRequest, CreateConfigResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";

interface CreateConfigurationProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (response: CreateConfigResponse, request: CreateConfigRequest) => void;
  onSettled?: () => void;
}

export function useCreateConfiguration({ onError, onSuccess, onSettled }: CreateConfigurationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...createConfigMutation({client: client}),
    onSuccess: (data, variables) => {
      const response = data as CreateConfigResponse;
      if (response.code !== 200) {
        onError?.(new Error(`Login failed: ${response.description}`));
      } else {
        queryClient.invalidateQueries({ queryKey: createConfigQueryKey(variables) });
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
