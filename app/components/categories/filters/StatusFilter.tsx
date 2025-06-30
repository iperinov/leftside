import type ItemData from "../ItemData";
import styles from "./Filters.module.css";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type { FilterGroupProps } from "./FiltersGroup";
import SelectDialog from "~/components/dialogs/SelectDialog";
import Filter from "./Filter";
import { useState } from "react";
import { allStringItemData } from "../ItemData";

function toItemData(): ItemData<string>[] {
  return [
    allStringItemData,
    { id: "0", name: "Pregame" },
    { id: "1", name: "Live"},
  ];
}

export default function StatusFilter({ categoryID, filterGroupID }: FilterGroupProps) {
  const selection = useCategoryTreeStore((state) => state.statusFilter(categoryID, filterGroupID));
  const updateStatusFilters = useCategoryTreeStore((state) => state.updateStatusFilter);
  const [show, setShow] = useState(false);
  const items = toItemData();
  const value = items.find((item) => item.id === selection)?.name;

  console.log("StatusFilter ", items, selection, value);

  return (
    <>
      <Filter key={"status"} label={"Status"} values={value ? [value] : []} onClick={() => setShow(true)} className={`${styles.filter}`} />

      {show && (
        <SelectDialog
          items={items}
          onConfirm={(selectedID) => {
            updateStatusFilters(categoryID, filterGroupID, selectedID);
            setShow(false);
          }}
          onCancel={() => setShow(false)}
          title="Select Status"
          valid={(value) => value !== selection}
          defaultSelectedID={selection}
        />
      )}
    </>
  );
}
