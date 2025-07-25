import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { createLeagueMutation, createLeagueQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { CreateLeagueRequest, CreateLeagueResponse, ResponseOk } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";

interface CreateLeagueProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (response: CreateLeagueResponse, request: CreateLeagueRequest) => void;
  onSettled?: () => void;
}

export function useCreateLeague({ onError, onSuccess, onSettled }: CreateLeagueProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...createLeagueMutation({client: client}),
    onSuccess: (data, variables) => {
      const response = data as ResponseOk;
      if (response.code !== 200) {
        onError?.(new Error(`Login failed: ${response.description}`));
      } else {
        queryClient.invalidateQueries({ queryKey: createLeagueQueryKey(variables) });
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