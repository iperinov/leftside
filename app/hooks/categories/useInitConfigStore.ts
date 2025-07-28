import { useQuery } from "@tanstack/react-query";
import { getConfiguration } from "~/api/cdb/getConfiguration";
import type { Category } from "~/api/sccs/types.gen";
import type CategoryTreeItem from "~/components/categories/tree/CategoryTreeItem";
import { queryKeys } from "~/lib/queryKeys";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { useAllConfigurationsBooks } from "../useAllConfigurationsBooks";
import { useAssignConfig } from "../configuraitons/useAssignConfig";

function toCategoryTree(categories: Category[]): CategoryTreeItem[] {
  return categories.map(
    (category) =>
      ({
        id: category.uuid,
        name: category.name,
        type: category.type,
        filterGroups: category.filterGroups,
        children: category.type === "flat" ? undefined : toCategoryTree(category.children || []),
      }) as CategoryTreeItem,
  );
}

export const useInitConfigStore = (configUUID: string) => {
  const resetTreeStore = useCategoryTreeStore((state) => state.reset);
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);
  const assingedBooks = useAssignedBooks()

  return useQuery({
    queryKey: queryKeys.configurationCategories(configUUID),
    queryFn: async () => {
      const configuration = await getConfiguration(configUUID);
      const tree = toCategoryTree(configuration.categories);
      resetTreeStore(configuration, tree, assingedBooks);
      return { root: rootCategory };
    },
  });
};
