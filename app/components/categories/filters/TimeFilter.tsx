import { useMemo } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { allItemString, isAllFilter } from "../AllItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import SingleSelectionFilter from "./SingleSelectionFilter";

export default function TimeFilter({ categoryUUID, filterGroupUUID }: FilterGroupProps) {
  const timeFilter = useCategoryTreeStore((state) => state.timeFilter);
  const updateTimeFilters = useCategoryTreeStore((state) => state.updateTimeFilter);
  const statusFilter = useCategoryTreeStore((state) => state.statusFilter);
  const filterValue = statusFilter(categoryUUID, filterGroupUUID).value
  const isLiveStatusSelected = isAllFilter(filterValue) ? false : (filterValue as boolean);
  
  const choices = useMemo(
    () => [
      allItemString,
      { id: "1h", name: "1h" },
      { id: "3h", name: "3h" },
      { id: "6h", name: "6h" },
      { id: "12h", name: "12h" },
      { id: "1d", name: "1 day" },
      { id: "2d", name: "2 days" },
      { id: "3d", name: "3 days" },
    ],
    []
  );

  return (
    <SingleSelectionFilter
      keyStr={"time"}
      label={"Time"}
      title={"Select Time"}
      items={choices}
      selection={timeFilter(categoryUUID, filterGroupUUID).value}
      updateFilterSelection={updateTimeFilters}
      disabled={isLiveStatusSelected}
      categoryUUID={categoryUUID}
      filterGroupUUID={filterGroupUUID}
    />
  );
}
