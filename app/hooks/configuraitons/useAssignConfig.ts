import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { assignConfigMutation, assignConfigQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { AssignBooksRequest, AssignBooksResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";
import { queryKeys } from "~/lib/queryKeys";

interface AssignConfigProps {
  configUUID: string;
  onError?: (error: DefaultError) => void;
  onSuccess?: (response: AssignBooksResponse, request: AssignBooksRequest) => void;
  onSettled?: () => void;
}

export function useAssignConfig({ configUUID, onError, onSuccess, onSettled }: AssignConfigProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...assignConfigMutation({ client: client }),
    onSuccess: (data, variables) => {
      const response = data as AssignBooksResponse;
      if (response.code !== 200) {
        onError?.(new Error(`Assign configuration failed with code (${response.code}): ${response.description}`));
      } else {
        queryClient.invalidateQueries({ queryKey: queryKeys.configurationsBooks() });
        queryClient.invalidateQueries({ queryKey: queryKeys.assignedBooks(configUUID) });
        queryClient.invalidateQueries({ queryKey: queryKeys.bookRevs() });
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
