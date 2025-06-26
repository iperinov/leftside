import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addSportFilter, type FilterItem } from "~/api/configs/sportFiltersApi";
import { cleanOptimisticUpdates } from "~/components/tree/common/cleanOptimisticUpdates";
import { findItem } from "~/components/tree/common/findItem";
import { sportFiltersQueryKey } from "~/common/queryKeys";

function useAddFilter(onComplete?: () => void) {
  const queryClient = useQueryClient();

  const optimisticAddSportFilter = (oldSportFilters: FilterItem[], { name, parentID }: { name: string; parentID?: string }) => {
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
      const previousFilters = queryClient.getQueryData<FilterItem[]>(sportFiltersQueryKey);
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
            cleanOptimisticUpdates(queryClient, sportFiltersQueryKey, [context.id], onComplete);
        }
    },
  });
}

export default function useAddItemState() {
  const [addItemData, setAddItemData] = useState<{ parentID?: string, level: number }>();
  const [addInProgressForParentID, setAddInProgressForParentID] = useState<string>();
  const resetAddItemData = () => { setAddItemData(undefined); setAddInProgressForParentID(undefined); };
  const { mutate: addFilter, isPending: isAddPending } = useAddFilter(resetAddItemData);

  return { addItemData, setAddItemData, resetAddItemData, addFilter, isAddPending, addInProgressForParentID, setAddInProgressForParentID };
}
