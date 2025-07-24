import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutMutation, logoutQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { CreateConfigResponse, LogoutResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";

interface LogoutProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (data: LogoutResponse) => void;
  onSettled?: () => void;
}

export default function useLogout({ onError, onSuccess, onSettled }: LogoutProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...logoutMutation({client: client}),
    onSuccess: (data, variables) => {
      const created = data as LogoutResponse;
      queryClient.invalidateQueries({ queryKey: logoutQueryKey(variables) });
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
