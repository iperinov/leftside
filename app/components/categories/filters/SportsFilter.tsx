import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import Filter from "./Filter";
import { useRealSports } from "~/hooks/useRealSport";
import { useState } from "react";
import MultiSelectDialog from "~/components/dialogs/MultiSelectDialog";
import type ItemData from "../ItemData";
import type { RealSport } from "~/api/ocs/ocs.types";
import styles from "./Filters.module.css";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type { FilterGroupProps } from "./FiltersGroup";
import useLeaguesForSports from "~/hooks/useLeaguesForSports";

interface SportFilterProps {
    onChange?: (selectedIDs: string[]) => void;
}

function toItemData(sports: RealSport[]): ItemData<string>[] {
  return sports.map((sport) => ({ id: String(sport.id), name: sport.name }));
}

export default function SportsFilter({ categoryID, filterGroupID, onChange }: SportFilterProps & FilterGroupProps) {
  const { data, isLoading, error } = useRealSports();
  const selections = useCategoryTreeStore((state) => state.sportFilters(categoryID, filterGroupID));
  const updateSportsFilters = useCategoryTreeStore((state) => state.updateSportsFilter);
  const [show, setShow] = useState(false);

  return (
    <>
      <LoadDataDecorator error={error} isLoading={isLoading} className={`${styles.filter}`}>
        <Filter
          key={"sport"}
          label={"Sports"}
          values={selections.map((id) => {
            const realSport = data?.find((item) => String(item.id) === id);
            return realSport ? realSport.name : "Unknown";
          })}
          onClick={() => setShow(true)}
          className={`${styles.filter}`}
        />
      </LoadDataDecorator>

      {show && data && (
        <MultiSelectDialog<string>
          items={toItemData(data)}
          onConfirm={(selectedIDs) => {
            updateSportsFilters(categoryID, filterGroupID, selectedIDs);
            setShow(false);
          }}
          onCancel={() => setShow(false)}
          title="Select Sports"
          valid={(values) => values.length !== selections.length || values.some((v) => !selections.includes(v))}
          defaultSelectedIDs={selections}
        />
      )}
    </>
  );
}
