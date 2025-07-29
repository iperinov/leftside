import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getConfiguration } from "~/api/cdb/getConfiguration";
import type { Category } from "~/api/sccs/types.gen";
import type CategoryTreeItem from "~/components/categories/tree/CategoryTreeItem";
import { queryClient } from "~/lib/queryClient";
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
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);
  const resetTreeStore = useCategoryTreeStore((state) => state.reset);
  const { data: assignedBooks, isLoading: isBooksLoading, error: errorBooks } = useConfigurationBooks(configUUID);

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.configurationCategories(configUUID),
    queryFn: async () => {
      const configuration = await getConfiguration(configUUID);
      const tree = toCategoryTree(configuration.categories);
      if (!assignedBooks) throw new Error("Invalid assign books");
      resetTreeStore(configuration, tree, assignedBooks || []);
      return rootCategory;
    },
    enabled: !!assignedBooks,
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return { data: data, isLoading: isLoading || isBooksLoading, error: error || errorBooks };
};
