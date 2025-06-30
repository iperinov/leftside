import type ItemData from "../ItemData";
import styles from "./Filters.module.css";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type { FilterGroupProps } from "./FiltersGroup";
import SelectDialog from "~/components/dialogs/SelectDialog";
import Filter from "./Filter";
import { useState } from "react";
import { allStringItemData } from "../ItemData";

function toItemData(): ItemData<string>[] {
  let items: ItemData<string>[] = [];
  for (let i = 1; i <= 20; i++) {
    items.push({
      id: String(i),
      name: `${i}`,
    });
  }
  return [allStringItemData, ...items];
}

export default function LimitFilter({ categoryID, filterGroupID }: FilterGroupProps) {
  const selection = useCategoryTreeStore((state) => state.limitFilter(categoryID, filterGroupID));
  const updateLimitFilters = useCategoryTreeStore((state) => state.updateLimitFilter);
  const [show, setShow] = useState(false);
  const items = toItemData();
  const value = items.find((item) => item.id === String(selection))?.name;

  return (
    <>
      <Filter key={"limit"} label={"Limit"} values={value ? [value] : []} onClick={() => setShow(true)} className={`${styles.filter}`} />

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
