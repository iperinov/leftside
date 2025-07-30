import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateConfigMutation, updateConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { UpdateConfigRequest, UpdateConfigResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";
import { queryKeys } from "~/lib/queryKeys";

interface UpdateConfigurationProps {
  configUUID: string;
  onError?: (error: DefaultError) => void;
  onSuccess?: (response: UpdateConfigResponse, request: UpdateConfigRequest) => void;
  onSettled?: () => void;
}

export function useUpdateConfiguration({ configUUID, onError, onSuccess, onSettled }: UpdateConfigurationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...updateConfigMutation({ client: client }),
    onSuccess: (data, variables) => {
      const response = data as UpdateConfigResponse;
      if (response.code !== 200) {
        onError?.(new Error(`Update configuration failed with code (${response.code}): ${response.description}`));
      } else {
        queryClient.invalidateQueries({ queryKey: queryKeys.configurations() });
        queryClient.invalidateQueries({ queryKey: queryKeys.configurationCategories(configUUID) });
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
