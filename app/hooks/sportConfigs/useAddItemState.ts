import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addSportFilter } from "~/api/configs/sportFiltersApi";
import { cleanOptimisticUpdate } from "~/common/cleanOptimisticCacheChanges";
import { findItem } from "~/common/findItem";
import { sportFiltersQueryKey } from "~/common/queryKeys";
import type TreeItemData from "~/components/tree/TreeItemData";

function useAddFilter(onComplete?: () => void) {
  const queryClient = useQueryClient();

  const optimisticAddSportFilter = (oldSportFilters: TreeItemData[], { name, parentID }: { name: string; parentID?: string }) => {
    let newSportFilters = structuredClone(oldSportFilters);
    const newItemID = `child-of-${parentID || "root"}`;
    const newItem = { name: name, id: newItemID, pending: true };
    if (!parentID) {
      // root filter
      newSportFilters.push(newItem);
    } else {
      // sub-filter filter
      let parent = findItem(parentID, newSportFilters);
      if (!parent) throw new Error(`Parent with ID ${parentID} not found`);
      parent.children ? parent.children.push(newItem) : (parent.children = [newItem]);
    }
    return { newSportFilters, id: newItemID };
  };

  return useMutation({
    mutationFn: addSportFilter,
    onMutate: ({ name, parentID }: { name: string; parentID?: string }) => {
      const previousFilters = queryClient.getQueryData<TreeItemData[]>(sportFiltersQueryKey);
      if (!previousFilters && parentID) throw new Error("No existing filters to add a new filter");
      const { newSportFilters, id } = optimisticAddSportFilter(previousFilters ?? [], { name, parentID });
      queryClient.setQueryData(sportFiltersQueryKey, newSportFilters);
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

export default function useAddItemState() {
  const [addItemData, setAddItemData] = useState<{ parentID?: string }>();
  const resetAddItemData = () => setAddItemData(undefined);
  const { mutate: addFilter, isPending: isAddPending } = useAddFilter(resetAddItemData);

  return { addItemData, setAddItemData, resetAddItemData, addFilter, isAddPending };
}
