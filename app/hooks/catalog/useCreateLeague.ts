import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import { createLeagueMutation, createLeagueQueryKey } from "~/api/sccs/@tanstack/react-query.gen";
import type { CreateLeagueResponse } from "~/api/sccs/types.gen";
import { client } from "~/lib/clients/sccs/client";
import { queryKeys } from "~/lib/queryKeys";

interface CreateLeagueProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (data: CreateLeagueResponse) => void;
  onSettled?: () => void;
}

export function useCreateLeague({ onError, onSuccess, onSettled }: CreateLeagueProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...createLeagueMutation({ client: client }),
    onSuccess: (data, variables) => {
      const created = data as CreateLeagueResponse;
      queryClient.invalidateQueries({ queryKey: queryKeys.realSports() });
      queryClient.invalidateQueries({ queryKey: queryKeys.regions() });
      queryClient.invalidateQueries({ queryKey: queryKeys.leagues() });
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
