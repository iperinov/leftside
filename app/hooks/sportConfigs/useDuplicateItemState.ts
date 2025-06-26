import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { duplicateSportFilter, type FilterItem } from "~/api/configs/sportFiltersApi";
import { cleanOptimisticUpdates } from "~/components/tree/common/cleanOptimisticUpdates";
import { findItem } from "~/components/tree/common/findItem";
import iterateItem from "~/components/tree/common/iterateItem";
import { sportFiltersQueryKey } from "~/common/queryKeys";

function useDuplicateFilter(onComplete?: () => void) {
  const queryClient = useQueryClient();

  const optimisticDuplicateSportFilter = (
    oldSportFilters: FilterItem[],
    { id, name, parentID }: { id: string; name: string; parentID?: string }
  ) => {
    const newSportFilters = structuredClone(oldSportFilters);
    const siblings = parentID ? findItem(parentID, newSportFilters)?.children || newSportFilters : newSportFilters;
    const item = findItem(id, siblings);
    if (!item) throw new Error(`Item with ID ${id} not found`);
    const newItem = { ...structuredClone(item), name }
    iterateItem(newItem, (item) => {
      item.id = `duplicate-${item.id}`
      item.pending = true; 
    });
    siblings.push(newItem);
    return { newSportFilters, newItemID: newItem.id };
  };

  return useMutation({
    mutationFn: duplicateSportFilter,
    onMutate: ({ id, name, parentID }) => {
      const previousFilters = queryClient.getQueryData<FilterItem[]>(sportFiltersQueryKey);
      if (!previousFilters) throw new Error("No existing filters to duplicate");

      const clone = structuredClone(previousFilters);
      const { newSportFilters, newItemID } = optimisticDuplicateSportFilter(clone, { id, name, parentID });

      queryClient.setQueryData(sportFiltersQueryKey, newSportFilters);
      return { previousFilters, newItemID };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sportFiltersQueryKey });
    },
    onError: (err, newFilter, context) => {
      if (context?.previousFilters) {
        queryClient.setQueryData(sportFiltersQueryKey, context.previousFilters);
      }
    },
    onSettled: (data, error, variables, context) => {
      if (context?.newItemID) {
        cleanOptimisticUpdates(queryClient, sportFiltersQueryKey, [context.newItemID], onComplete);
      }
    },
  });
}

export default function useDuplicateItemState() {
  const [duplicateItemData, setDuplicateItemData] = useState<{ id: string; name: string; parentID?: string }>();
  const resetDuplicateItemData = () => setDuplicateItemData(undefined);
  const { mutate: duplicateFilter, isPending: isDuplicatePending } = useDuplicateFilter(resetDuplicateItemData);

  return { duplicateItemData, setDuplicateItemData, resetDuplicateItemData, duplicateFilter, isDuplicatePending };
}
