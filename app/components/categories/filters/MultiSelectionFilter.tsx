import { useState } from "react";
import MultiSelectDialog from "~/components/dialogs/MultiSelectDialog";
import type ItemData from "~/types/ItemData";
import { allItem } from "../AllItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import Filter from "./Filter";
import styles from "./Filters.module.css";

interface MultiSelectionFilterProps {
  keyStr: string;
  label: string;
  title: string;
  items: ItemData<string>[];
  disabled?: boolean;

  filterSelections(categoryID: string, filterID: string): string[];
  updateFilterSelection(categoryID: string, filterID: string, selected: string[]): void;
  onChange?: (selectedIDs: string[]) => void;
}

export default function MultiSelectionFilter({
  categoryUUID,
  filterGroupUUID,
  keyStr,
  label,
  title,
  items,
  disabled = false,

  filterSelections,
  updateFilterSelection,
  onChange,
}: MultiSelectionFilterProps & FilterGroupProps) {
  const selections = filterSelections(categoryUUID, filterGroupUUID);
  const [show, setShow] = useState(false);

  return (
    <>
      <Filter
        key={keyStr}
        label={label}
        values={selections.flatMap((id) => {
          if (id === allItem.id) return [allItem.name];
          const item = items?.find((item) => String(item.id) === id);
          return item ? [item.name] : [];
        })}
        onClick={() => setShow(true)}
        className={`${styles.filter}`}
        disabled={disabled}
      />

      {show && items && (
        <MultiSelectDialog<string>
          items={items}
          includeAllItem={true}
          onConfirm={(selectedIDs) => {
            updateFilterSelection(categoryUUID, filterGroupUUID, selectedIDs);
            setShow(false);
          }}
          onCancel={() => setShow(false)}
          title={title}
          valid={(values) => values.length !== selections.length || values.some((v) => !selections.includes(v))}
          defaultSelectedIDs={selections}
          onSelectionChange={(selectedIDs) => onChange?.(selectedIDs)}
        />
      )}
    </>
  );
}
