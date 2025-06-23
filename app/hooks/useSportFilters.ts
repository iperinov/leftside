import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addSportFilter, duplicateSportFilter, getListOfSportFilters, renameSportFilter } from "~/api/configs/sportFiltersApi";
import { duplicateItem } from "~/common/duplicateItem";
import { findItem } from "~/common/findItem";
import type TreeItemData from "~/components/tree/TreeItemData";

const sportFiltersQueryKey = ["sportFilters"];

export default function useSportFilters() {
  return useQuery({
    queryKey: sportFiltersQueryKey,
    queryFn: getListOfSportFilters,
  });
}

export function useAddFilter(onComplete?: () => void) {
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


export function useRenameFilter(onComplete?: () => void) {
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

export function useDuplicateFilter(onComplete?: () => void) {
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