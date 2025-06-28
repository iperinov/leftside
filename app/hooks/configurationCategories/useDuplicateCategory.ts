import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCategory } from "~/api/configs/sportFiltersApi";
import { cleanOptimisticUpdates } from "~/components/tree/common/cleanOptimisticUpdates";
import { findItem } from "~/components/tree/common/findItem";
import iterateItem from "~/components/tree/common/iterateItem";
import type { Category } from "~/api/scs/configurations/config.types";
import { queryKeys } from "~/lib/queryKeys";

export function useDuplicateCategory(onComplete?: () => void) {
  const queryClient = useQueryClient();

  const optimisticDuplicateCategory = (
    oldCategories: Category[],
    { uuid, name, parentUUID }: { uuid: string; name: string; parentUUID?: string }
  ) => {
    const newCategories = structuredClone(oldCategories);
    const siblings = parentUUID ? findItem(parentUUID, newCategories)?.children || newCategories : newCategories;
    const item = findItem(uuid, siblings);
    if (!item) throw new Error(`Item with ID ${uuid} not found`);
    const newItem = { ...structuredClone(item), name }
    iterateItem(newItem, (item) => {
      item.uuid = `duplicate-${item.uuid}`
      item.pending = true; 
    });
    siblings.push(newItem);
    return { newCategories, newItemUUID: newItem.uuid };
  };

  return useMutation({
    mutationFn: duplicateCategory,
    onMutate: ({ uuid, name, parentUUID }) => {
      const oldCategories = queryClient.getQueryData<Category[]>(queryKeys.configurationCategories());
      if (!oldCategories) throw new Error("No existing filters to duplicate");

      const clone = structuredClone(oldCategories);
      const { newCategories, newItemUUID } = optimisticDuplicateCategory(clone, { uuid, name, parentUUID });

      queryClient.setQueryData(queryKeys.configurationCategories(), newCategories);
      return { oldCategories, newItemUUID };
    },
    onSuccess: () => {
      //queryClient.invalidateQueries({ queryKey: queryKeys.configurationCategories() });
    },
    onError: (err, newFilter, context) => {
      if (context?.oldCategories) {
        queryClient.setQueryData(queryKeys.configurationCategories(), context.oldCategories);
      }
    },
    onSettled: (data, error, variables, context) => {
      if (context?.newItemUUID) {
        cleanOptimisticUpdates(queryClient, queryKeys.configurationCategories(), [context.newItemUUID], onComplete);
      }
    },
  });
}