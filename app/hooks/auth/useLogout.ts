import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutMutation, logoutQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { LogoutResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";

interface LogoutProps {
  onError?: (error: Error) => void;
  onSuccess?: (response: LogoutResponse) => void;
  onSettled?: () => void;
}

export default function useLogout({ onError, onSuccess, onSettled }: LogoutProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...logoutMutation({ client: client }),
    onSuccess: (data, variables) => {
      const response = data as LogoutResponse;
      if (response.code !== 200) {
        onError?.(new Error(`Logout failed with code (${response.code}): ${response.description}`));
      } else {
        queryClient.invalidateQueries({ queryKey: logoutQueryKey(variables) });
        onSuccess?.(response);
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
