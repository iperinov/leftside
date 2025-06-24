import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { renameSportFilter } from "~/api/configs/sportFiltersApi";
import { cleanOptimisticUpdate } from "~/common/cleanOptimisticCacheChanges";
import { findItem } from "~/common/findItem";
import { sportFiltersQueryKey } from "~/common/queryKeys";
import type TreeItemData from "~/components/tree/TreeItemData";

function useRenameFilter(onComplete?: () => void) {
  const queryClient = useQueryClient();

  const optimisticRenameSportFilter = (oldSportFilters: TreeItemData[], { id, name }: { id: string; name: string }) => {
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
      const previousFilters = queryClient.getQueryData<TreeItemData[]>(sportFiltersQueryKey);
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
        cleanOptimisticUpdate(queryClient, sportFiltersQueryKey, [context.id], onComplete);
      }
    },
  });
}

export default function useRenameItemState() {
  const [renameItemData, setRenameItemData] = useState<{ id: string; name: string }>();
  const resetRenameItemData = () => setRenameItemData(undefined);
  const { mutate: renameFilter, isPending: isRenamePending } = useRenameFilter(resetRenameItemData);

  return { renameItemData, setRenameItemData, resetRenameItemData, renameFilter, isRenamePending };
}
