import { useQuery } from "@tanstack/react-query";
import { getConfiguration } from "~/api/cdb/getConfiguration";
import type { Category } from "~/api/sccs/types.gen";
import type CategoryTreeItem from "~/components/categories/tree/CategoryTreeItem";
import { queryKeys } from "~/lib/queryKeys";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { useConfigurationBooks } from "../useConfigurationBooks";

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
  const {data: assignedBooks, isLoading: isBooksLoading, error: errorBooks } = useConfigurationBooks(configUUID);

  const { data: configuration, isLoading: isConfigurationLoading, error: errorConfiguration } = useQuery({
    queryKey: queryKeys.configurationCategories(configUUID),
    queryFn: () => getConfiguration(configUUID),
  });

  if (configuration && assignedBooks) {
    const tree = toCategoryTree(configuration.categories);
    resetTreeStore(configuration, tree, assignedBooks);
  }
  
  return { isLoading: isConfigurationLoading || isBooksLoading, error: errorBooks || errorConfiguration };
};
