import { useMemo } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import SingleSelectionFilter from "./SingleSelectionFilter";

export default function SortByFilter(props: FilterGroupProps) {
  const sortByFilter = useCategoryTreeStore((state) => state.sortByFilter);
  const updateSortByFilters = useCategoryTreeStore((state) => state.updateSortByFilter);
  const choices = useMemo(
    () => [
      { id: "time", name: "Start Time" },
      { id: "alpha", name: "Alphabetical" },
    ],
    [],
  );

  return (
    <SingleSelectionFilter
      keyStr={"sortBy"}
      label={"Sort By"}
      title={"Sort by"}
      items={choices}
      selection={sortByFilter(props.categoryUUID, props.filterGroupUUID)}
      updateFilterSelection={updateSortByFilters}
      {...props}
    />
  );
}
