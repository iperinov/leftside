import { useMemo, useState } from "react";
import type { RealSport } from "~/api/ocs/ocs.types";
import MultiSelectDialog from "~/components/dialogs/MultiSelectDialog";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import { useRealSports } from "~/hooks/useRealSport";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { allItemData } from "../AllItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import Filter from "./Filter";
import styles from "./Filters.module.css";
import type ItemData from "~/types/ItemData";

interface SportFilterProps {
  onChange?: (selectedIDs: string[]) => void;
}

function toItemData(sports: RealSport[]): ItemData<string>[] {
  return sports.map((sport) => ({ id: String(sport.id), name: sport.name }));
}

export default function SportsFilter({
  categoryID,
  filterGroupID,
  onChange,
}: SportFilterProps & FilterGroupProps) {
  const { data, isLoading, error } = useRealSports();
  const sportFilters = useCategoryTreeStore((state) => state.sportFilters);
  const updateSportsFilters = useCategoryTreeStore(
    (state) => state.updateSportsFilter,
  );
  const [show, setShow] = useState(false);
  const allItem = useMemo(() => allItemData(), []);
  const selections = sportFilters(categoryID, filterGroupID);

  return (
    <>
      <LoadDataDecorator
        error={error}
        isLoading={isLoading}
        className={`${styles.filter}`}
      >
        <Filter
          key={"sport"}
          label={"Sports"}
          values={selections.map((id) => {
            if (id === allItem.id) return allItem.name;
            const realSport = data?.find((item) => String(item.id) === id);
            return realSport ? realSport.name : "";
          })}
          onClick={() => setShow(true)}
          className={`${styles.filter}`}
        />
      </LoadDataDecorator>

      {show && data && (
        <MultiSelectDialog<string>
          items={toItemData(data)}
          includeAllItem={true}
          onConfirm={(selectedIDs) => {
            updateSportsFilters(categoryID, filterGroupID, selectedIDs);
            setShow(false);
          }}
          onCancel={() => setShow(false)}
          title="Select Sports"
          valid={(values) =>
            values.length !== selections.length ||
            values.some((v) => !selections.includes(v))
          }
          defaultSelectedIDs={selections}
          onSelectionChange={(selectedIDs) => onChange?.(selectedIDs)}
        />
      )}
    </>
  );
}
