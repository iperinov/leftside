import { useMemo } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ItemData from "~/types/ItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import SingleSelectionFilter from "./SingleSelectionFilter";

export default function LimitFilter(props: FilterGroupProps) {
  const limitFilter = useCategoryTreeStore((state) => state.limitFilter);
  const updateLimitFilters = useCategoryTreeStore(
    (state) => state.updateLimitFilter,
  );
  const choices = useMemo(() => {
    const items: ItemData<number>[] = [{ id: 0, name: "All" }];
    for (let i = 1; i <= 20; i++) {
      items.push({
        id: i,
        name: `${i}`,
      });
    }
    return items;
  }, []);

  return (
    <SingleSelectionFilter<number | undefined>
      keyStr={"limit"}
      label={"Limit"}
      title={"Select Limit"}
      items={choices}
      filterSelection={limitFilter}
      updateFilterSelection={updateLimitFilters}
      {...props}
    />
  );
}
