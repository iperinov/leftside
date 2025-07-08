import type { BasicEntity, RealSport } from "~/api/ocs/ocs.types";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ItemData from "~/types/ItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import styles from "./Filters.module.css";
import MultiSelectionFilter from "./MultiSelectionFilter";
import { useCatalog } from "~/hooks/catalog/useCatalog";

interface SportFilterProps {
  onChange?: (selectedUUIDs: string[]) => void;
}

function choices(sports: BasicEntity[]): ItemData<string>[] {
  return sports.map((sport) => ({ id: String(sport.uuid), name: sport.name }));
}

export default function SportsFilter({ categoryUUID, filterGroupUUID, onChange }: SportFilterProps & FilterGroupProps) {
  const { data: catalog, isLoading, error } = useCatalog();
  const sportFilters = useCategoryTreeStore((state) => state.sportFilters);
  const updateSportsFilters = useCategoryTreeStore((state) => state.updateSportsFilter);

  return (
    <LoadDataDecorator error={error} isLoading={isLoading} className={`${styles.filter}`}>
      <MultiSelectionFilter
        categoryUUID={categoryUUID}
        filterGroupUUID={filterGroupUUID}
        keyStr="sport"
        label="Sports"
        title="Select Sports"
        items={choices(catalog?.sports || [])}
        filterSelections={sportFilters}
        updateFilterSelection={updateSportsFilters}
        onChange={onChange}
      />
    </LoadDataDecorator>
  );
}
