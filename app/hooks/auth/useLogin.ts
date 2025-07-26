import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginMutation, loginQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { LoginResponse, ResponseOk } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";

interface LoginProps {
  onError?: (error: Error) => void;
  onSuccess?: (response: LoginResponse, request: { username: string; password: string }) => void;
  onSettled?: () => void;
}

export default function useLogin({ onError, onSuccess, onSettled }: LoginProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...loginMutation({ client: client }),
    onSuccess: (data, variables) => {
      const response = data as LoginResponse;
      if (response.code !== 200) {
        onError?.(new Error(`Login failed with code (${response.code}): ${response.description}`));
      } else {
        queryClient.invalidateQueries({ queryKey: loginQueryKey(variables) });
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
