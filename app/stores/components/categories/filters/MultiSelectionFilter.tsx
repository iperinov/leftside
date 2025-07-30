import { useState } from "react";
import type { AllFilter } from "~/api/sccs/types.gen";
import MultiSelectDialog from "~/components/dialogs/MultiSelectDialog";
import type ItemData from "~/types/ItemData";
import { allFilter, isAllArray, isAllItemDataArray } from "../AllItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import Filter from "./Filter";
import styles from "./Filters.module.css";

interface MultiSelectionFilterProps<T extends string | number> {
  keyStr: string;
  label: string;
  title: string;
  items: ItemData<T>[];
  selections: T[];
  disabled?: boolean;

  updateFilterSelection(categoryID: string, filterID: string, selected: T[] | AllFilter): void;
  onChange?: (selectedIDs: T[]) => void;
}

export default function MultiSelectionFilter<T extends string | number>({
  categoryUUID,
  filterGroupUUID,
  keyStr,
  label,
  title,
  items,
  selections,
  disabled = false,

  updateFilterSelection,
  onChange,
}: MultiSelectionFilterProps<T> & FilterGroupProps) {
  const [show, setShow] = useState(false);
  const values = isAllArray(selections) ? ["All"] : items.flatMap((item) => (selections.includes(item.id) ? item.name : []));
  return (
    <>
      <Filter key={keyStr} label={label} values={values} onClick={() => setShow(true)} className={`${styles.filter}`} disabled={disabled} />

      {show && items && (
        <MultiSelectDialog<T>
          items={items}
          includeAllItem={true}
          onConfirm={(selectedIDs) => {
            updateFilterSelection(categoryUUID, filterGroupUUID, isAllArray(selectedIDs) ? allFilter : selectedIDs);
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
