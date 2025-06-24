import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addSportFilter } from "~/api/configs/sportFiltersApi";
import { findItem } from "~/common/findItem";
import { sportFiltersQueryKey } from "~/common/queryKeys";
import type TreeItemData from "~/components/tree/TreeItemData";

function useAddFilter(onComplete?: () => void) {
  const queryClient = useQueryClient();

  const optimisticAddSportFilter = (oldSportFilters: TreeItemData[], { name, parentID }: { name: string; parentID?: string }) => {
    const newFilter = {name: name, id: `child-of-${parentID || "root"}`};
    if (!parentID) { // root filter
      oldSportFilters.push(newFilter);
    } else { // sub-filter filter
      let parent = findItem<TreeItemData>(parentID, oldSportFilters);
      if (!parent) {
        throw new Error(`Parent with ID ${parentID} not found`);
      }
      parent.children ? parent.children.push(newFilter) : (parent.children = [newFilter]);
    }
  };

  return useMutation({
    mutationFn: addSportFilter,
    onMutate: ({ name, parentID }: { name: string; parentID?: string }) => {
      const previousFilters = queryClient.getQueryData<TreeItemData[]>(sportFiltersQueryKey);
      if (previousFilters) {
        const newSportFilters = optimisticAddSportFilter(previousFilters, { name, parentID });
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

export default function useAddItemState() {
    const [ addItemData, setAddItemData ] = useState<{ parentID?: string }>();
    const resetAddItemData = () => setAddItemData(undefined);
    const { mutate: addFilter, isPending: isAddPending } = useAddFilter(resetAddItemData);

    return { addItemData, setAddItemData, resetAddItemData, addFilter, isAddPending };
}