import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { assignConfigMutation, assignConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { AssignBooksRequest, AssignBooksResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";

interface AssignConfigProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (response: AssignBooksResponse, request: AssignBooksRequest) => void;
  onSettled?: () => void;
}

export function useAssignConfig({ onError, onSuccess, onSettled }: AssignConfigProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...assignConfigMutation({ client: client }),
    onSuccess: (data, variables) => {
      const response = data as AssignBooksResponse;
      if (response.code !== 200) {
        onError?.(new Error(`Assign configuration failed with code (${response.code}): ${response.description}`));
      } else {
        queryClient.invalidateQueries({ queryKey: assignConfigQueryKey(variables) });
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
