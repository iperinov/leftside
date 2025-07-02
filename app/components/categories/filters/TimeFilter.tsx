import { useState } from "react";
import SelectDialog from "~/components/dialogs/SelectDialog";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { allItemData } from "../AllItemData";
import type ItemData from "../ItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import Filter from "./Filter";
import styles from "./Filters.module.css";

function toItemData(): ItemData<string>[] {
  return [
    allItemData(),
    { id: "1", name: "1h" },
    { id: "3", name: "3h" },
    { id: "6", name: "6h" },
    { id: "12", name: "12h" },
    { id: "24", name: "1 day" },
    { id: "48", name: "2 days" },
    { id: "72", name: "3 days" },
    { id: "168", name: "1 week" },
    { id: "336", name: "2 weeks" },
    { id: "720", name: "1 month" },
  ];
}

export default function TimeFilter({
  categoryID,
  filterGroupID,
}: FilterGroupProps) {
  const timeFilter = useCategoryTreeStore((state) => state.timeFilter);
  const updateTimeFilters = useCategoryTreeStore(
    (state) => state.updateTimeFilter,
  );
  const [show, setShow] = useState(false);
  const items = toItemData();
  const selection = timeFilter(categoryID, filterGroupID);
  const value = items.find((item) => item.id === selection)?.name;

  return (
    <>
      <Filter
        key={"time"}
        label={"Time"}
        values={value ? [value] : []}
        onClick={() => setShow(true)}
        className={`${styles.filter}`}
      />

      {show && (
        <SelectDialog
          items={toItemData()}
          onConfirm={(selectedID) => {
            updateTimeFilters(categoryID, filterGroupID, selectedID);
            setShow(false);
          }}
          onCancel={() => setShow(false)}
          title="Select Time"
          valid={(value) => value !== selection}
          defaultSelectedID={selection}
        />
      )}
    </>
  );
}
