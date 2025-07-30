import { useMemo } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { allFilter, allItemNumber, isAllFilter } from "../AllItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import SingleSelectionFilter from "./SingleSelectionFilter";

export default function StatusFilter(props: FilterGroupProps) {
  const statusFilter = useCategoryTreeStore((state) => state.statusFilter);
  const updateStatusFilters = useCategoryTreeStore((state) => state.updateStatusFilter);
  const choices = useMemo(() => [allItemNumber, { id: 0, name: "Pregame" }, { id: 1, name: "Live" }], []);
  const filterValue = statusFilter(props.categoryUUID, props.filterGroupUUID)?.value;
  const selection = filterValue === undefined ? undefined : isAllFilter(filterValue) ? allItemNumber.id : (filterValue as boolean) ? 1 : 0;

  return (
    <SingleSelectionFilter<number>
      keyStr={"status"}
      label={"Status"}
      title={"Select Status"}
      items={choices}
      selection={selection}
      updateFilterSelection={(categoryUUID, filterGroupUUID, selection) => {
        updateStatusFilters(categoryUUID, filterGroupUUID, selection === allItemNumber.id ? allFilter : selection === 1);
      }}
      {...props}
    />
  );
}
