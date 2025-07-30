import { type DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getConfigLeaguesOptions,
  getConfigLeaguesQueryKey,
  getConfigRealsportsOptions,
  getConfigRealsportsQueryKey,
  getConfigRegionsOptions,
  getConfigRegionsQueryKey,
} from "~/api/ocs/@tanstack/react-query.gen";
import { createLeagueMutation } from "~/api/sccs/@tanstack/react-query.gen";
import type { CreateLeagueResponse } from "~/api/sccs/types.gen";
import { client as ocsClient } from "~/lib/clients/ocs/client";
import { client as sccsClient } from "~/lib/clients/sccs/client";
import { queryKeys } from "~/lib/queryKeys";
import { isResponseError } from "~/utils/typeGuards";

interface CreateLeagueProps {
  onError?: (error: DefaultError) => void;
  onSuccess?: (data: CreateLeagueResponse) => void;
  onSettled?: () => void;
}

export function useCreateLeague({ onError, onSuccess, onSettled }: CreateLeagueProps) {
  const queryClient = useQueryClient();
  return useMutation({
    ...createLeagueMutation({ client: sccsClient }),
    onSuccess: (data, variables) => {
      queryClient.removeQueries({ queryKey: getConfigRealsportsOptions({ client: ocsClient }).queryKey });
      queryClient.removeQueries({ queryKey: getConfigRegionsOptions({ client: ocsClient }).queryKey });
      queryClient.removeQueries({ queryKey: getConfigLeaguesOptions({ client: ocsClient }).queryKey });
      queryClient.removeQueries({ queryKey: queryKeys.catalogItems() });
      console.log("useCreateLeague.onSuccess", data, getConfigLeaguesOptions({ client: ocsClient }).queryKey);
      if (isResponseError(data)) {
        onError?.(new Error(data.description));
        return;
      }

      const created = data as CreateLeagueResponse;
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
