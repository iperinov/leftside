import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { allItem } from "../AllItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import SingleSelectionFilter from "./SingleSelectionFilter";
import { useMemo } from "react";

export default function StatusFilter(props: FilterGroupProps) {
  const statusFilter = useCategoryTreeStore((state) => state.statusFilter);
  const updateStatusFilters = useCategoryTreeStore((state) => state.updateStatusFilter);
  const choices = useMemo(() => ([
    allItem,
    { id: "0", name: "Pregame" },
    { id: "1", name: "Live" }
  ]), []);

  return (
    <SingleSelectionFilter
      keyStr={"status"}
      label={"Status"}
      title={"Select Status"}
      items={choices}
      filterSelection={statusFilter}
      updateFilterSelection={updateStatusFilters}
      {...props}
    />
  );
}
