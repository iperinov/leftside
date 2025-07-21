import { useMemo } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ItemData from "~/types/ItemData";
import { isAllFilter } from "../AllItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import SingleSelectionFilter from "./SingleSelectionFilter";
import type { FiltersTypeInteger, FiltersTypeString, MarketFilter, SportFilter } from "~/api/sccs/types.gen";

function generateChoices(sportFilter: SportFilter, marketFilter: MarketFilter): ItemData<string>[] {
  const isAllMarketsSelected = isAllFilter(marketFilter);
  const marketsSelected = isAllMarketsSelected ? -1 : (marketFilter.value as FiltersTypeInteger).length;

  const isAllSportsSelected = isAllFilter(sportFilter);
  const sportsSelected = isAllSportsSelected ? -1 : (sportFilter.value as FiltersTypeString).length;
  
  switch (true) {
    case !isAllSportsSelected && sportsSelected === 1 && marketsSelected === 0:
      return [
        { id: "leagueDay", name: "League/Day" },
        { id: "dayLeague", name: "Day/League" },
      ];
    case (isAllSportsSelected || sportsSelected > 1) && marketsSelected === 0:
      return [
        { id: "sportLeague", name: "Sport/League" },
        { id: "sportDay", name: "Sport/Day" },
      ];
    default: //case sportsSelected > 0 && marketsSelected > 0
      return [{ id: "dayGame", name: "Day/Game" }];;
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
      selection={groupByFilter(props.categoryUUID, props.filterGroupUUID)}
      updateFilterSelection={updateGroupByFilters}
      {...props}
    />
  );
}
