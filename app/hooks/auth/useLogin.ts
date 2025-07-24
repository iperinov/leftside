import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { loginMutation, loginQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { LoginResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";

interface LoginProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (data: LoginResponse) => void;
  onSettled?: () => void;
}

export default function useLogin({ onError, onSuccess, onSettled }: LoginProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...loginMutation({client: client}),
    onSuccess: (data, variables) => {
      const created = data as LoginResponse;
      queryClient.invalidateQueries({ queryKey: loginQueryKey(variables) });
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
