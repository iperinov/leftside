import type ItemData from "../ItemData";
import styles from "./Filters.module.css";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import SelectDialog from "~/components/dialogs/SelectDialog";
import Filter from "./Filter";
import { useState } from "react";
import { allItemData } from "../ItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";

function toItemData(): ItemData<string>[] {
  return [
    allItemData,
    { id: "0", name: "Pregame" },
    { id: "1", name: "Live"},
  ];
}

export default function StatusFilter({ categoryID, filterGroupID }: FilterGroupProps) {
  const statusFilter = useCategoryTreeStore((state) => state.statusFilter);
  const updateStatusFilters = useCategoryTreeStore((state) => state.updateStatusFilter);
  const [show, setShow] = useState(false);
  const items = toItemData();
  const selection = statusFilter(categoryID, filterGroupID)
  const value = items.find((item) => item.id === selection)?.name;

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
