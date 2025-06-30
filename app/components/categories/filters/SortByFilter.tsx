import type ItemData from "../ItemData";
import styles from "./Filters.module.css";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import SelectDialog from "~/components/dialogs/SelectDialog";
import Filter from "./Filter";
import { useState } from "react";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";

function toItemData(): ItemData<string>[] {
  return [
    { id: "asc", name: "asc" },
    { id: "desc", name: "desc" },
  ];
}

export default function SortByFilter({ categoryID, filterGroupID }: FilterGroupProps) {
  const sortByFilter = useCategoryTreeStore((state) => state.sortByFilter);
  const updateSortByFilters = useCategoryTreeStore((state) => state.updateSortByFilter);
  const [show, setShow] = useState(false);
  const items = toItemData();
  const selection = sortByFilter(categoryID, filterGroupID);
  const value = items.find((item) => item.id === String(selection))?.name;

  return (
    <>
      <Filter key={"sortBy"} label={"Sort By"} values={value ? [value] : []} onClick={() => setShow(true)} className={`${styles.filter}`} />

      {show && (
        <SelectDialog
          items={toItemData()}
          onConfirm={(selectedID) => {
            updateSortByFilters(categoryID, filterGroupID, selectedID as "asc" | "desc");
            setShow(false);
          }}
          onCancel={() => setShow(false)}
          title="Sort by"
          valid={(value) => value !== selection}
          defaultSelectedID={selection}
        />
      )}
    </>
  );
}
