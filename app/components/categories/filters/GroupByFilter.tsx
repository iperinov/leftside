import { useMemo } from "react";
import type { FiltersTypeInteger, FiltersTypeString, MarketFilter, SportFilter } from "~/api/sccs/types.gen";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ItemData from "~/types/ItemData";
import { isAllFilter } from "../AllItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import SingleSelectionFilter from "./SingleSelectionFilter";

function generateChoices(sportFilter: SportFilter, marketFilter: MarketFilter): ItemData<string>[] {
  const isAllMarketsSelected = isAllFilter(marketFilter);
  const marketsSelected = isAllMarketsSelected ? -1 : (marketFilter.value as FiltersTypeInteger).length;

  const isAllSportsSelected = isAllFilter(sportFilter);
  const sportsSelected = isAllSportsSelected ? -1 : (sportFilter.value as FiltersTypeString).length;

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

  const sportsFilter = sportFilters(categoryUUID, filterGroupUUID);
  const marketsFilter = marketFilters(categoryUUID, filterGroupUUID);
  const choices = useMemo(() => generateChoices(sportsFilter, marketsFilter), [sportsFilter, marketsFilter]);

  return (
    <SingleSelectionFilter
      keyStr={"groupBy"}
      label={"Group By"}
      title={"Group by"}
      items={choices}
      selection={groupByFilter(props.categoryUUID, props.filterGroupUUID)?.join(".") || ""}
      updateFilterSelection={(categoryUUID, filterGroupUUID, selected) =>
        updateGroupByFilters(categoryUUID, filterGroupUUID, selected !== "" ? selected.split(".") : [])
      }
      {...props}
    />
  );
}
