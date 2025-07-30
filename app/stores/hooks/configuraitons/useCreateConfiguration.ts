import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { createConfigMutation, createConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { CreateConfigRequest, CreateConfigResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";
import { queryKeys } from "~/lib/queryKeys";

interface CreateConfigurationProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (response: CreateConfigResponse, request: CreateConfigRequest) => void;
  onSettled?: () => void;
}

export function useCreateConfiguration({ onError, onSuccess, onSettled }: CreateConfigurationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...createConfigMutation({ client: client }),
    onSuccess: (data, variables) => {
      const response = data as CreateConfigResponse;
      if (response.code !== 200) {
        onError?.(new Error(`Create configuration failed with code (${response.code}): ${response.description}`));
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
