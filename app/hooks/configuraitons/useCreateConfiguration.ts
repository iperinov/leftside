import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { createConfigMutation, createConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { CreateConfigResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";

interface CreateConfigurationProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (data: CreateConfigResponse) => void;
  onSettled?: () => void;
}

export function useCreateConfiguration({ onError, onSuccess, onSettled }: CreateConfigurationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...createConfigMutation({client: client}),
    onSuccess: (data, variables) => {
      const created = data as CreateConfigResponse;
      queryClient.invalidateQueries({ queryKey: createConfigQueryKey(variables) });
      onSuccess?.(created);
    },
    onError: (error) => {
      onError?.(error);
    },
    onSettled: () => {
      onSettled?.();
    },
  });
}
