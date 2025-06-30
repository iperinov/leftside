import type ItemData from "../ItemData";
import styles from "./Filters.module.css";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type { FilterGroupProps } from "./FiltersGroup";
import SelectDialog from "~/components/dialogs/SelectDialog";
import Filter from "./Filter";
import { useState } from "react";

function toItemData(sportsSelected: number, marketsSelected: number): ItemData<string>[] {
  switch(true) {
    case sportsSelected == 1 && marketsSelected == 0: 
      return [
        {id: "league.day",name: "League/Day"},
        {id: "day.league",name: "Day/League"}
      ];
    case sportsSelected > 1 && marketsSelected == 0: 
      return [
        {id: "sport.league",name: "Sport/League"},
        {id: "sport.day",name: "Sport/Day"}
      ];
    case sportsSelected > 0 && marketsSelected > 0: 
      return [{id: "Day/Game",name: "Day/Game"}];
    default:
      return [];
  };
}

export default function GroupByFilter({ categoryID, filterGroupID }: FilterGroupProps) {
  const selection = useCategoryTreeStore((state) => state.groupByFilter(categoryID, filterGroupID));
  const sportsSelection = useCategoryTreeStore((state) => state.sportFilters(categoryID, filterGroupID));
  // const marketsSelection = useCategoryTreeStore((state) => state.marketFilters(categoryID, filterGroupID));
  const updateGroupByFilters = useCategoryTreeStore((state) => state.updateGroupByFilter);
  const [show, setShow] = useState(false);
  const items = toItemData(sportsSelection.length, 0/*marketsSelection.length*/);
  const value = items.find((item) => item.id === selection)?.name;
  
  return (
    <>
      <Filter
        key={"groupBy"}
        label={"Group By"}
        values={value ? [value] : []}
        onClick={() => setShow(true)}
        className={`${styles.filter}`}
      />

      {show && (
        <SelectDialog
          items={items}
          onConfirm={(selectedID) => {
            updateGroupByFilters(categoryID, filterGroupID, selectedID);
            setShow(false);
          }}
          onCancel={() => setShow(false)}
          title="Group by"
          valid={(value) => value !== selection}
          defaultSelectedID={selection}
        />
      )}
    </>
  );
}
