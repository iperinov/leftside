import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { duplicateSportFilter } from "~/api/configs/sportFiltersApi";
import { duplicateItem } from "~/common/duplicateItem";
import { findItem } from "~/common/findItem";
import { sportFiltersQueryKey } from "~/common/queryKeys";
import type TreeItemData from "~/components/tree/TreeItemData";

function useDuplicateFilter(onComplete?: () => void) {
  const queryClient = useQueryClient();

  const optimisticDuplicateSportFilter = (oldSportFilters: TreeItemData[], { id, parentID }: { id: string; parentID?: string }) => {
    const siblings = parentID ? findItem<TreeItemData>(parentID, oldSportFilters)?.children || oldSportFilters : oldSportFilters;
    const item = findItem<TreeItemData>(id, siblings);
    if (!item) {
      throw new Error(`Item with ID ${id} not found`);
    }
    const newItem = duplicateItem(item);
    newItem.name = `${newItem.name} Copy`;
    siblings.push(newItem);
  };

  return useMutation({
    mutationFn: duplicateSportFilter,
    onMutate: ({ id, parentID }: { id: string; parentID?: string }) => {
      const previousFilters = queryClient.getQueryData<TreeItemData[]>(sportFiltersQueryKey);
      if (previousFilters) {
        const newSportFilters = optimisticDuplicateSportFilter(previousFilters, { id, parentID });
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

export default function useDuplicateItemState() {
  const [duplicateItemData, setDuplicateItemData] = useState<{ id: string; name: string; parent?: TreeItemData }>();
  const resetDuplicateItemData = () => setDuplicateItemData(undefined);
  const { mutate: duplicateFilter, isPending: isDuplicatePending } = useDuplicateFilter(resetDuplicateItemData);

  return { duplicateItemData, setDuplicateItemData, resetDuplicateItemData, duplicateFilter, isDuplicatePending };
}