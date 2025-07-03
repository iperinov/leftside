import { useState } from "react";
import SelectDialog from "~/components/dialogs/SelectDialog";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import Filter from "./Filter";
import styles from "./Filters.module.css";
import type ItemData from "~/types/ItemData";

interface SingleSelectionFilterProps<T> {
  keyStr: string;
  label: string;
  title: string;
  items: ItemData<T>[];
  
  filterSelection(categoryID: string, filterID: string): T;
  updateFilterSelection(categoryID: string, filterID: string, selected: T): void;
}

export default function SingleSelectionFilter<T>({
  categoryID,
  filterGroupID,
  keyStr,
  label,
  title,
  items,
  filterSelection,
  updateFilterSelection,
}: SingleSelectionFilterProps<T> & FilterGroupProps) {
  const [show, setShow] = useState(false);
  const selection = filterSelection(categoryID, filterGroupID);
  const selectionName = items.find((item) => item.id === selection)?.name;

  if (keyStr === "limit") {
    console.log({selection, items})
  }

  return (
    <>
      <Filter key={keyStr} label={label} values={selectionName ? [selectionName] : []} onClick={() => setShow(true)} className={`${styles.filter}`} />

      {show && (
        <SelectDialog
          items={items}
          onConfirm={(selectedID) => {
            selectedID !== undefined && updateFilterSelection(categoryID, filterGroupID, selectedID);
            setShow(false);
          }}
          onCancel={() => setShow(false)}
          title={title}
          valid={(value) => value !== selection}
          defaultSelectedID={selection}
        />
      )}
    </>
  );
}
