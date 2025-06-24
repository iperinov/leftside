import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { renameSportFilter } from "~/api/configs/sportFiltersApi";
import { findItem } from "~/common/findItem";
import { sportFiltersQueryKey } from "~/common/queryKeys";
import type TreeItemData from "~/components/tree/TreeItemData";

function useRenameFilter(onComplete?: () => void) {
  const queryClient = useQueryClient();

  const optimisticRenameSportFilter = (oldSportFilters: TreeItemData[], { id, name }: { id: string; name: string }) => {
    const item = findItem<TreeItemData>(id, oldSportFilters);
    if (!item) {
      throw new Error(`Item with ID ${id} not found`);
    }
    item.name = name;
  };

  return useMutation({
    mutationFn: renameSportFilter,
    onMutate: ({ id, name }: { id: string; name: string }) => {
      const previousFilters = queryClient.getQueryData<TreeItemData[]>(sportFiltersQueryKey);
      if (previousFilters) {
        const newSportFilters = optimisticRenameSportFilter(previousFilters, { id, name });
        queryClient.setQueryData(sportFiltersQueryKey, newSportFilters);
      }
      return { previousFilters };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sportFiltersQueryKey });
    },
    onError: (err, newFilter, context) => {
      queryClient.setQueryData(sportFiltersQueryKey, context?.previousFilters);
    },
    onSettled: () => {
      onComplete?.();
    },
  });
}

export default function useRenameItemState() {
  const [renameItemData, setRenameItemData] = useState<{ id: string; name: string }>();
  const resetRenameItemData = () => setRenameItemData(undefined);
  const { mutate: renameFilter, isPending: isRenamePending } = useRenameFilter(resetRenameItemData);

  return { renameItemData, setRenameItemData, resetRenameItemData, renameFilter, isRenamePending };
}
