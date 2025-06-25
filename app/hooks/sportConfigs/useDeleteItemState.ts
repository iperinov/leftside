import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteSportFilter } from "~/api/configs/sportFiltersApi";
import { findItemSiblings } from "~/components/tree/common/findItem";
import { sportFiltersQueryKey } from "~/common/queryKeys";
import type TreeItemData from "~/components/tree/common/TreeItemData";

function useDeleteFilter(onComplete?: () => void) {
  const queryClient = useQueryClient();

  const optimisticDeleteSportFilter = (oldSportFilters: TreeItemData[], { id }: { id: string }) => {
    let newSportFilters = structuredClone(oldSportFilters);
    const siblings = findItemSiblings(id, newSportFilters);
    if (!siblings) throw new Error(`Item with ID ${id} not found`);
    const itemIndex = siblings.findIndex((item) => item.id === id);
    if (itemIndex === -1) throw new Error(`Item with ID ${id} not found in siblings`);
    siblings.splice(itemIndex, 1);
    return newSportFilters;
  };

  return useMutation({
    mutationFn: deleteSportFilter,
    onMutate: ({ id }: { id: string }) => {
      const previousFilters = queryClient.getQueryData<TreeItemData[]>(sportFiltersQueryKey);
      if (!previousFilters) throw new Error("No existing filters to delete");
      const newSportFilters = optimisticDeleteSportFilter(previousFilters, { id });
      queryClient.setQueryData(sportFiltersQueryKey, newSportFilters);
      return { previousFilters };
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: sportFiltersQueryKey }); },
    onError: (err, newFilter, context) => { queryClient.setQueryData(sportFiltersQueryKey, context?.previousFilters); },
    onSettled: () => { onComplete?.()},
  });
}

export default function useDeleteItemState() {
  const [deleteItemData, setDeleteItemData] = useState<{ id: string }>();
  const resetDeleteItemData = () => setDeleteItemData(undefined);
  const { mutate: deleteFilter, isPending: isDeletePending } = useDeleteFilter(resetDeleteItemData);

  return { deleteItemData, setDeleteItemData, resetDeleteItemData, deleteFilter, isDeletePending };
}
