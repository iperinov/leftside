import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "~/api/configs/sportFiltersApi";
import { findItemSiblings } from "~/components/tree/common/findItem";
import type { Category } from "~/api/scs/configurations/config.types";
import { queryKeys } from "~/lib/queryKeys";

export function useDeleteCategory(onComplete?: () => void) {
  const queryClient = useQueryClient();

  const optimisticDeleteCategory = (oldCategories: Category[], { uuid }: { uuid: string }) => {
    let newCategories = structuredClone(oldCategories);
    const siblings = findItemSiblings(uuid, newCategories);
    if (!siblings) throw new Error(`Item with ID ${uuid} not found`);
    const itemIndex = siblings.findIndex((item) => item.uuid === uuid);
    if (itemIndex === -1) throw new Error(`Item with ID ${uuid} not found in siblings`);
    siblings.splice(itemIndex, 1);
    return newCategories;
  };

  return useMutation({
    mutationFn: deleteCategory,
    onMutate: ({ uuid }: { uuid: string }) => {
      const oldCategories = queryClient.getQueryData<Category[]>(queryKeys.configurationCategories());
      if (!oldCategories) throw new Error("No existing filters to delete");
      const newCategories = optimisticDeleteCategory(oldCategories, { uuid });
      queryClient.setQueryData(queryKeys.configurationCategories(), newCategories);
      return { oldCategories };
    },
    onSuccess: () => { /*queryClient.invalidateQueries({ queryKey: queryKeys.configurationCategories() });*/ },
    onError: (err, newCategory, context) => { queryClient.setQueryData(queryKeys.configurationCategories(), context?.oldCategories); },
    onSettled: () => { onComplete?.()},
  });
}