import { useQuery } from "@tanstack/react-query";
import { getConfigurationCategories } from "~/api/scs/categories/getConfigurationCategories";
import type { Category } from "~/api/scs/configurations/config.types";
import type CategoryTreeItem from "~/components/categories/tree/CategoryTreeItem";
import { queryKeys } from "~/lib/queryKeys";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";

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

export const useCategories = (uuid: string) => {
  const resetTreeStore = useCategoryTreeStore((state) => state.reset);
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);

  return useQuery({
    queryKey: queryKeys.configurationCategories(uuid),
    queryFn: async () => {
      const categories = await getConfigurationCategories(uuid);
      const tree = toCategoryTree(categories);
      resetTreeStore(tree);
      return { root: rootCategory };
    },
  });
};
