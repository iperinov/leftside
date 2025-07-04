import { useMemo } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { allItem } from "../AllItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import SingleSelectionFilter from "./SingleSelectionFilter";

export default function TimeFilter(props: FilterGroupProps) {
  const timeFilter = useCategoryTreeStore((state) => state.timeFilter);
  const updateTimeFilters = useCategoryTreeStore((state) => state.updateTimeFilter);
  const choices = useMemo(
    () => [
      allItem,
      { id: "1", name: "1h" },
      { id: "3", name: "3h" },
      { id: "6", name: "6h" },
      { id: "12", name: "12h" },
      { id: "24", name: "1 day" },
      { id: "48", name: "2 days" },
      { id: "72", name: "3 days" },
      { id: "168", name: "1 week" },
      { id: "336", name: "2 weeks" },
      { id: "720", name: "1 month" },
    ],
    [],
  );

  return (
    <SingleSelectionFilter
      keyStr={"time"}
      label={"Time"}
      title={"Select Time"}
      items={choices}
      filterSelection={timeFilter}
      updateFilterSelection={updateTimeFilters}
      {...props}
    />
  );
}
