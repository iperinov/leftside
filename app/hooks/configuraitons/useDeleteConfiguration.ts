import { useMutation, useQueryClient, type DefaultError } from "@tanstack/react-query";
import { deleteConfigMutation, deleteConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { DeleteConfigResponse } from "~/api/sccs/types.gen";

export interface DeleteConfig {
  uuid: string;
  rev: string;
}

interface DeleteConfigurationProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (response: DeleteConfigResponse) => void;
  onSettled?: () => void;
}

export const useDeleteConfiguration = ({onError, onSuccess, onSettled}: DeleteConfigurationProps) => {
    const queryClient = useQueryClient();
    return useMutation({
      ...deleteConfigMutation(),
      onSuccess: (data, variables) => {
        const created = data as DeleteConfigResponse;
        queryClient.invalidateQueries({ queryKey: deleteConfigQueryKey(variables) });
        onSuccess?.(created);
      },
      onError: (error) => {
        onError?.(error);
      },
      onSettled: () => {
        onSettled?.();
      }
    });
};
