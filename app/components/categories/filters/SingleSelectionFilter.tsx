import { useState } from "react";
import SelectDialog from "~/components/dialogs/SelectDialog";
import type ItemData from "~/types/ItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import Filter from "./Filter";


interface SingleSelectionFilterProps<T extends string | number> {
  keyStr: string;
  label: string;
  title: string;
  items: ItemData<T>[];
  selection: T | undefined;
  disabled?: boolean;

  updateFilterSelection(categoryUUID: string, filterGroupUUID: string, selected: T): void;
}

export default function SingleSelectionFilter<T extends string | number>({
  categoryUUID,
  filterGroupUUID,
  keyStr,
  label,
  title,
  items,
  selection,
  disabled = false,

  updateFilterSelection,
}: SingleSelectionFilterProps<T> & FilterGroupProps) {
  const [show, setShow] = useState(false);
  const selectionName = selection !== undefined ? items.find((item) => item.id === selection)?.name : undefined;

  return (
    <>
      <Filter
        key={keyStr}
        label={label}
        values={disabled ? [] : selectionName ? [selectionName] : []}
        onClick={() => setShow(true)}
        disabled={disabled}
      />

      {show && (
        <SelectDialog
          items={items}
          onConfirm={(selectedID) => {
            if (selectedID !== undefined) {
              const selectedItem = items.find((item) => item.id.toString() === selectedID.toString());
              if (selectedItem) {
                updateFilterSelection(categoryUUID, filterGroupUUID, selectedItem.id);
              }
            }
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
