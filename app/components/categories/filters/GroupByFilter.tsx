import { useState } from "react";
import SelectDialog from "~/components/dialogs/SelectDialog";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ItemData from "../ItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import Filter from "./Filter";
import styles from "./Filters.module.css";

function toItemData(
  sportsSelected: number,
  marketsSelected: number,
): ItemData<string>[] {
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

export default function GroupByFilter({
  categoryID,
  filterGroupID,
}: FilterGroupProps) {
  const groupByFilter = useCategoryTreeStore((state) => state.groupByFilter);
  const sportFilters = useCategoryTreeStore((state) => state.sportFilters);
  const marketFilters = useCategoryTreeStore((state) => state.marketFilters);
  const updateGroupByFilters = useCategoryTreeStore(
    (state) => state.updateGroupByFilter,
  );
  const [show, setShow] = useState(false);
  const selection = groupByFilter(categoryID, filterGroupID);
  const sportsSelection = sportFilters(categoryID, filterGroupID);
  const marketsSelection = marketFilters(categoryID, filterGroupID);
  const items = toItemData(
    sportsSelection.length,
    0 /*marketsSelection.length*/,
  );
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
            selectedID && updateGroupByFilters(categoryID, filterGroupID, selectedID);
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
