import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addSportFilter, getListOfSportFilters } from "~/api/configs/sportFiltersApi";
import type TreeItemData from "~/components/tree/TreeItemData";

const sportFiltersQueryKey = ["sportFilters"];

export default function useSportFilters() {
  return useQuery({
    queryKey: sportFiltersQueryKey,
    queryFn: getListOfSportFilters,
  });
}

export function useAddFilter() {
  const queryClient = useQueryClient();

  function findItemInChildren(id: string, children: TreeItemData[]): TreeItemData | undefined {
    for (const child of children) {
      if (child.id === id) {
        return child;
      }
      if (!child.children || child.children.length === 0) {
        continue;
      }

      const found = findItemInChildren(id, child.children);
      if (found) {
        return found;
      }
    }

    return undefined;
  }

  const optimisticAddSportFilter = (oldSportFilters: TreeItemData[], { newFilter, parentID }: { newFilter: TreeItemData; parentID?: string }) => {
    if (!parentID) {
      // root filter
      oldSportFilters.push(newFilter);
    } else {
      // sub-filter filter
      let parent = findItemInChildren(parentID, oldSportFilters);
      if (!parent) {
        throw new Error(`Parent with ID ${parentID} not found`);
      }
      parent.children ? parent.children.push(newFilter) : (parent.children = [newFilter]);
    }
  };

  return useMutation({
    mutationFn: addSportFilter,
    onMutate: ({ newFilter, parentID }: { newFilter: TreeItemData; parentID?: string }) => {
      const previousFilters = queryClient.getQueryData<TreeItemData[]>(sportFiltersQueryKey);

      if (previousFilters) {
        const newSportFilters = optimisticAddSportFilter(previousFilters, { newFilter, parentID });
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
  });
}
