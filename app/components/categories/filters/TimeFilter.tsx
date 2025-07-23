import { useMemo } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { allItemNumber, allItemString, isAllFilter } from "../AllItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import SingleSelectionFilter from "./SingleSelectionFilter";

export default function TimeFilter({ categoryUUID, filterGroupUUID }: FilterGroupProps) {
  const timeFilter = useCategoryTreeStore((state) => state.timeFilter);
  const updateTimeFilters = useCategoryTreeStore((state) => state.updateTimeFilter);
  const statusFilter = useCategoryTreeStore((state) => state.statusFilter);
  const filterValue = statusFilter(categoryUUID, filterGroupUUID).value;
  const isLiveStatusSelected = isAllFilter(filterValue) ? false : (filterValue as boolean);
  const timeFilterValue = timeFilter(categoryUUID, filterGroupUUID).value;
  const isAllTimeSelected = isAllFilter(timeFilterValue);

  const choices = useMemo(
    () => [
      allItemNumber,
      { id: 1, name: "1h" },
      { id: 3, name: "3h" },
      { id: 6, name: "6h" },
      { id: 12, name: "12h" },
      { id: 24, name: "24h" },
      { id: 48, name: "48h" },
      { id: 72, name: "72h" },
    ],
    [],
  );

  return (
    <SingleSelectionFilter
      keyStr={"time"}
      label={"Time"}
      title={"Select Time"}
      items={choices}
      selection={isAllTimeSelected ? allItemNumber.id : timeFilterValue}
      updateFilterSelection={updateTimeFilters}
      disabled={isLiveStatusSelected}
      categoryUUID={categoryUUID}
      filterGroupUUID={filterGroupUUID}
    />
  );
}
