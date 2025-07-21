import { useMutation, useQueryClient, type DefaultError } from "@tanstack/react-query";
import { createConfigMutation, createConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { CreateConfigResponse } from "~/api/sccs/types.gen";

interface CreateConfigurationProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (data: CreateConfigResponse) => void;
}

export function useCreateConfiguration({ onError, onSuccess }: CreateConfigurationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...createConfigMutation(),
    onSuccess: (data, variables) => {
      const created = data as CreateConfigResponse;
      queryClient.invalidateQueries({ queryKey: createConfigQueryKey(variables) });
      onSuccess?.(created);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
