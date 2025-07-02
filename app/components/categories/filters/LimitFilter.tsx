import { useState } from "react";
import SelectDialog from "~/components/dialogs/SelectDialog";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { allItemData } from "../AllItemData";
import type ItemData from "../ItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import Filter from "./Filter";
import styles from "./Filters.module.css";

function toItemData(): ItemData<string>[] {
  const items: ItemData<string>[] = [];
  for (let i = 1; i <= 20; i++) {
    items.push({
      id: String(i),
      name: `${i}`,
    });
  }
  return [allItemData(), ...items];
}

export default function LimitFilter({
  categoryID,
  filterGroupID,
}: FilterGroupProps) {
  const limitFilter = useCategoryTreeStore((state) => state.limitFilter);
  const updateLimitFilters = useCategoryTreeStore(
    (state) => state.updateLimitFilter,
  );
  const [show, setShow] = useState(false);
  const items = toItemData();
  const selection = limitFilter(categoryID, filterGroupID);
  const value = items.find((item) => item.id === String(selection))?.name;

  return (
    <>
      <Filter
        key={"limit"}
        label={"Limit"}
        values={value ? [value] : []}
        onClick={() => setShow(true)}
        className={`${styles.filter}`}
      />

      {show && (
        <SelectDialog
          items={items}
          onConfirm={(selectedID) => {
            updateLimitFilters(categoryID, filterGroupID, selectedID);
            setShow(false);
          }}
          onCancel={() => setShow(false)}
          title="Select Time"
          valid={(value) => value !== String(selection)}
          defaultSelectedID={String(selection) || ""}
        />
      )}
    </>
  );
}
