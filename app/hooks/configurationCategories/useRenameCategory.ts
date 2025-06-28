import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameCategory } from "~/api/configs/sportFiltersApi";
import { cleanOptimisticUpdates } from "~/components/tree/common/cleanOptimisticUpdates";
import { findItem } from "~/components/tree/common/findItem";
import type { Category } from "~/api/scs/configurations/config.types";
import { queryKeys } from "~/lib/queryKeys";

export function useRenameFilter(onComplete?: () => void) {
  const queryClient = useQueryClient();

  const optimisticRenameCategory = (oldCategories: Category[], { uuid, name }: { uuid: string; name: string }) => {
    let newCategories = structuredClone(oldCategories);
    const item = findItem(uuid, newCategories);
    if (!item) {
      throw new Error(`Item with ID ${uuid} not found`);
    }
    item.name = name;
    item.pending = true;
    return newCategories;
  };

  return useMutation({
    mutationFn: renameCategory,
    onMutate: ({ uuid, name }: { uuid: string; name: string }) => {
      const oldCategories = queryClient.getQueryData<Category[]>(queryKeys.configurationCategories());
      if (oldCategories) {
        const newCategories = optimisticRenameCategory(oldCategories, { uuid, name });
        queryClient.setQueryData(queryKeys.configurationCategories(), newCategories);
      }
      return { oldCategories, uuid };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.configurationCategories() });
    },
    onError: (err, newFilter, context) => {
      queryClient.setQueryData(queryKeys.configurationCategories(), context?.oldCategories);
    },
    onSettled: (data, error, variables, context) => {
      if (context?.uuid) {
        cleanOptimisticUpdates(queryClient, queryKeys.configurationCategories(), [context.uuid], onComplete);
      }
    },
  });
}