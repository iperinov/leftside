import { useMemo } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import type ItemData from "~/types/ItemData";
import SingleSelectionFilter from "./SingleSelectionFilter";

function generateChoices(sportsSelected: number, marketsSelected: number): ItemData<string>[] {
  switch (true) {
    case sportsSelected === 1 && marketsSelected === 0:
      return [
        { id: "league.day", name: "League/Day" },
        { id: "day.league", name: "Day/League" },
      ];
    case sportsSelected > 1 && marketsSelected === 0:
      return [
        { id: "sport.league", name: "Sport/League" },
        { id: "sport.day", name: "Sport/Day" },
      ];
    default: //case sportsSelected > 0 && marketsSelected > 0
      return [{ id: "day.game", name: "Day/Game" }];
  }
}

export default function GroupByFilter(props: FilterGroupProps) {
  const { categoryID, filterGroupID } = props;
  const groupByFilter = useCategoryTreeStore((state) => state.groupByFilter);
  const sportFilters = useCategoryTreeStore((state) => state.sportFilters);
  const marketFilters = useCategoryTreeStore((state) => state.marketFilters);
  const updateGroupByFilters = useCategoryTreeStore((state) => state.updateGroupByFilter);

  const sportsSelection = sportFilters(categoryID, filterGroupID);
  const marketsSelection = marketFilters(categoryID, filterGroupID);
  const choices = useMemo(() => generateChoices(sportsSelection.length, marketsSelection.length), [sportsSelection.length, marketsSelection.length]);
 
  return (
    <SingleSelectionFilter
      keyStr={"groupBy"}
      label={"Group By"}
      title={"Group by"}
      items={choices}
      filterSelection={groupByFilter}
      updateFilterSelection={updateGroupByFilters}
      {...props}
    />
  );
}
