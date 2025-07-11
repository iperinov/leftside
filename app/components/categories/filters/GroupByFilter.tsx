import { useMemo } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ItemData from "~/types/ItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import SingleSelectionFilter from "./SingleSelectionFilter";
import { allItem } from "../AllItemData";

function generateChoices(sportFilterUUIDs: string[], marketFilterUUIDs: string[]): ItemData<string>[] {
  const sportsSelected = sportFilterUUIDs.length;
  const marketsSelected = marketFilterUUIDs.length;
  const isAllSportsSelected = sportsSelected === 1 && sportFilterUUIDs.includes(allItem.id);
  
  switch (true) {
    case !isAllSportsSelected && sportsSelected === 1 && marketsSelected === 0:
      return [
        { id: "league.day", name: "League/Day" },
        { id: "day.league", name: "Day/League" },
      ];
    case (isAllSportsSelected || sportsSelected > 1) && marketsSelected === 0:
      return [
        { id: "sport.league", name: "Sport/League" },
        { id: "sport.day", name: "Sport/Day" },
      ];
    default: //case sportsSelected > 0 && marketsSelected > 0
      return [{ id: "day.game", name: "Day/Game" }];
  }
}

export default function GroupByFilter(props: FilterGroupProps) {
  const { categoryUUID, filterGroupUUID } = props;
  const groupByFilter = useCategoryTreeStore((state) => state.groupByFilter);
  const sportFilters = useCategoryTreeStore((state) => state.sportFilters);
  const marketFilters = useCategoryTreeStore((state) => state.marketFilters);
  const updateGroupByFilters = useCategoryTreeStore((state) => state.updateGroupByFilter);

  const sportsSelection = sportFilters(categoryUUID, filterGroupUUID);
  const marketsSelection = marketFilters(categoryUUID, filterGroupUUID);
  const choices = useMemo(() => generateChoices(sportsSelection, marketsSelection), [sportsSelection.length, marketsSelection.length]);

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
