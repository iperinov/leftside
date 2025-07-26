import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteConfigMutation, deleteConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { DeleteConfigRequest, DeleteConfigResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";

export interface DeleteConfig {
  uuid: string;
  rev: string;
}

interface DeleteConfigurationProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (response: DeleteConfigResponse, request: DeleteConfigRequest) => void;
  onSettled?: () => void;
}

export const useDeleteConfiguration = ({ onError, onSuccess, onSettled }: DeleteConfigurationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...deleteConfigMutation({ client: client }),
    onSuccess: (data, variables) => {
      const response = data as DeleteConfigResponse;
      if (response.code !== 200) {
        onError?.(new Error(`Delete configuration failed with code (${response.code}): ${response.description}`));
      } else {
        queryClient.invalidateQueries({ queryKey: deleteConfigQueryKey(variables) });
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
};
