import type { RealSport } from "~/api/ocs/ocs.types";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import { useRealSports } from "~/hooks/useRealSport";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import styles from "./Filters.module.css";
import type ItemData from "~/types/ItemData";
import MultiSelectionFilter from "./MultiSelectionFilter";

interface SportFilterProps {
  onChange?: (selectedIDs: string[]) => void;
}

function choices(sports: RealSport[]): ItemData<string>[] {
  return sports.map((sport) => ({ id: String(sport.id), name: sport.name }));
}

export default function SportsFilter({ categoryID, filterGroupID, onChange }: SportFilterProps & FilterGroupProps) {
  const { data: sports, isLoading, error } = useRealSports();
  const sportFilters = useCategoryTreeStore((state) => state.sportFilters);
  const updateSportsFilters = useCategoryTreeStore((state) => state.updateSportsFilter);
  
  return (
      <LoadDataDecorator error={error} isLoading={isLoading} className={`${styles.filter}`}>
        <MultiSelectionFilter
          categoryID={categoryID}
          filterGroupID={filterGroupID}
          keyStr="sport"
          label="Sports"
          title="Select Sports"
          items={choices(sports || [])}
          filterSelections={sportFilters}
          updateFilterSelection={updateSportsFilters}
          onChange={onChange}
        />
      </LoadDataDecorator>
  )
}
