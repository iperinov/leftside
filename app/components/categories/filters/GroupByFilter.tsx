import { useMemo } from "react";
import { GroupBy } from "~/api/scs/configurations/config.consts";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ItemData from "~/types/ItemData";
import { allItem } from "../AllItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import SingleSelectionFilter from "./SingleSelectionFilter";

function generateChoices(sportFilterUUIDs: string[], marketFilterUUIDs: string[]): ItemData<string>[] {
  const sportsSelected = sportFilterUUIDs.length;
  const marketsSelected = marketFilterUUIDs.length;
  const isAllSportsSelected = sportsSelected === 1 && sportFilterUUIDs.includes(allItem.id);

  switch (true) {
    case !isAllSportsSelected && sportsSelected === 1 && marketsSelected === 0:
      return [
        { id: GroupBy.LeagueDay, name: "League/Day" },
        { id: GroupBy.DayLeague, name: "Day/League" },
      ];
    case (isAllSportsSelected || sportsSelected > 1) && marketsSelected === 0:
      return [
        { id: GroupBy.SportLeague, name: "Sport/League" },
        { id: GroupBy.Day, name: "Sport/Day" },
      ];
    default: //case sportsSelected > 0 && marketsSelected > 0
      return [{ id: GroupBy.Day, name: "Day/Game" }];
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
  const choices = useMemo(() => generateChoices(sportsSelection, marketsSelection), [sportsSelection, marketsSelection]);

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
