import { useState } from "react";
import SelectDialog from "~/components/dialogs/SelectDialog";
import type ItemData from "~/types/ItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import Filter from "./Filter";
import styles from "./Filters.module.css";

interface SingleSelectionFilterProps<T> {
  keyStr: string;
  label: string;
  title: string;
  items: ItemData<T>[];

  filterSelection(categoryUUID: string, filterGroupUUID: string): T;
  updateFilterSelection(categoryUUID: string, filterGroupUUID: string, selected: T | undefined): void;
  disabled?: boolean;
}

export default function SingleSelectionFilter<T>({
  categoryUUID,
  filterGroupUUID,
  keyStr,
  label,
  title,
  items,
  filterSelection,
  updateFilterSelection,
  disabled = false,
}: SingleSelectionFilterProps<T> & FilterGroupProps) {
  const [show, setShow] = useState(false);
  const selection = filterSelection(categoryUUID, filterGroupUUID);
  const selectionName = items.find((item) => item.id === selection)?.name;

  return (
    <>
      <Filter
        key={keyStr}
        label={label}
        values={selectionName ? [selectionName] : []}
        onClick={() => setShow(true)}
        disabled={disabled}
        className={`${styles.filter}`}
      />

      {show && (
        <SelectDialog
          items={items}
          onConfirm={(selectedID) => {
            selectedID !== undefined && updateFilterSelection(categoryUUID, filterGroupUUID, selectedID);
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
