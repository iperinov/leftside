import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { renameSportFilter, type FilterItem } from "~/api/configs/sportFiltersApi";
import { cleanOptimisticUpdates } from "~/components/tree/common/cleanOptimisticUpdates";
import { findItem } from "~/components/tree/common/findItem";
import { sportFiltersQueryKey } from "~/common/queryKeys";

export function useRenameFilter(onComplete?: () => void) {
  const queryClient = useQueryClient();

  const optimisticRenameSportFilter = (oldSportFilters: FilterItem[], { id, name }: { id: string; name: string }) => {
    let newSportFilters = structuredClone(oldSportFilters);
    const item = findItem(id, newSportFilters);
    if (!item) {
      throw new Error(`Item with ID ${id} not found`);
    }
    item.name = name;
    item.pending = true;
    return newSportFilters;
  };

  return useMutation({
    mutationFn: renameSportFilter,
    onMutate: ({ id, name }: { id: string; name: string }) => {
      const previousFilters = queryClient.getQueryData<FilterItem[]>(sportFiltersQueryKey);
      if (previousFilters) {
        const newSportFilters = optimisticRenameSportFilter(previousFilters, { id, name });
        queryClient.setQueryData(sportFiltersQueryKey, newSportFilters);
      }
      return { previousFilters, id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sportFiltersQueryKey });
    },
    onError: (err, newFilter, context) => {
      queryClient.setQueryData(sportFiltersQueryKey, context?.previousFilters);
    },
    onSettled: (data, error, variables, context) => {
      if (context?.id) {
        cleanOptimisticUpdates(queryClient, sportFiltersQueryKey, [context.id], onComplete);
      }
    },
  });
}