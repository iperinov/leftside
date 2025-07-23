import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import { useCatalog } from "~/hooks/catalog/useCatalog";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ItemData from "~/types/ItemData";
import type { BasicEntity, RealSport } from "~/types/sport/types";
import { allItemString, isAllFilter } from "../AllItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import styles from "./Filters.module.css";
import MultiSelectionFilter from "./MultiSelectionFilter";

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
  const filterValue = sportFilters(categoryUUID, filterGroupUUID).value;
  const selections = isAllFilter(filterValue) ? [allItemString.id] : (filterValue as string[]);

  return (
    <LoadDataDecorator error={error} isLoading={isLoading} className={`${styles.filter}`}>
      <MultiSelectionFilter
        categoryUUID={categoryUUID}
        filterGroupUUID={filterGroupUUID}
        keyStr="sport"
        label="Sports"
        title="Select Sports"
        items={choices(catalog?.sports || [])}
        selections={selections}
        updateFilterSelection={updateSportsFilters}
        onChange={onChange}
      />
    </LoadDataDecorator>
  );
}
