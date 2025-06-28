import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cleanOptimisticUpdates } from "~/components/tree/common/cleanOptimisticUpdates";
import { findItem } from "~/components/tree/common/findItem";
import type { Category } from "~/api/scs/configurations/config.types";
import { queryKeys } from "~/lib/queryKeys";
import { addCategory } from "~/api/configs/sportFiltersApi";

export default function useAddCategory(onComplete?: () => void) {
  const queryClient = useQueryClient();

  const optimisticAddCategory = (oldCategories: Category[], { name, parentUUID }: { name: string; parentUUID?: string }) => {
    let newCategories = structuredClone(oldCategories);
    const newItemID = `child-of-${parentUUID || "root"}`;
    const newItem = { name: name, uuid: newItemID, pending: true } as Category;
    if (!parentUUID) {
      // root filter
      newCategories.push(newItem);
    } else {
      // sub-filter filter
      let parent = findItem(parentUUID, newCategories);
      if (!parent) throw new Error(`Parent with ID ${parentUUID} not found`);
      parent.children ? parent.children.push(newItem) : (parent.children = [newItem]);
    }
    return { newCategories, id: newItemID };
  };

  return useMutation({
    mutationFn: addCategory,
    onMutate: ({ name, parentUUID }: { name: string; parentUUID?: string }) => {
      const oldCategories = queryClient.getQueryData<Category[]>(queryKeys.configurationCategories());
      if (!oldCategories && parentUUID) throw new Error("No existing filters to add a new filter");
      const { newCategories, id } = optimisticAddCategory(oldCategories ?? [], { name, parentUUID });
      queryClient.setQueryData(queryKeys.configurationCategories(), newCategories);
      return { oldCategories, id };
    },
    onSuccess: () => {
      //queryClient.invalidateQueries({ queryKey: queryKeys.configurationCategories() });
    },
    onError: (err, newFilter, context) => {
      queryClient.setQueryData(queryKeys.configurationCategories(), context?.oldCategories);
    },
    onSettled: (data, error, variables, context) => {
        if (context?.id) {
            cleanOptimisticUpdates(queryClient, queryKeys.configurationCategories(), [context.id], onComplete);
        }
    },
  });
}