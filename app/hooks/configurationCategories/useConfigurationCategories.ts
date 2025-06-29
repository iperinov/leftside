import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getConfigurationCategories } from "~/api/scs/categories/getConfigurationCategories";
import type { Category } from "~/api/scs/configurations/config.types";
import type CategoryTreeItem from "~/components/categories/CategoryTreeItem";
import { queryKeys } from "~/lib/queryKeys";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";

function toCategoryTree(categories: Category[]): CategoryTreeItem[] {
  return categories.map(
    (category) =>
      ({
        id: category.uuid,
        name: category.name,
        type: category.type,
        "filter-groups": category["filter-groups"],
        children: category.type == "flat" ? undefined : toCategoryTree(category.children || []),
      } as CategoryTreeItem)
  );
}

export const useConfigurationCategories = (configID: string) => {
  const resetTreeStore = useCategoryTreeStore((state) => state.reset);
  const rootCategories = useCategoryTreeStore((state) => state.rootCategories);

  return useQuery({
    queryKey: queryKeys.configurationCategories(configID),
    queryFn: async () => {
      const categories = await getConfigurationCategories(configID);
      const tree = toCategoryTree(categories)
      resetTreeStore(tree);
      console.log("rootCategories: ", categories, tree, rootCategories());
      return rootCategories();
    },
  });
};
