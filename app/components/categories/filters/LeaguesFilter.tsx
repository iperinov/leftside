import type { BasicEntity, League } from "~/api/ocs/ocs.types";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import { useCatalog } from "~/hooks/catalog/useCatalog";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ItemData from "~/types/ItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import styles from "./Filters.module.css";
import MultiSelectionFilter from "./MultiSelectionFilter";

interface LeagueFilterProps {
  onChange?: (selectedIDs: string[]) => void;
}

function choices(leagues: BasicEntity[]): ItemData<string>[] {
  return leagues.map((league) => ({
    id: String(league.uuid),
    name: league.name,
  }));
}

export default function LeaguesFilter({ categoryUUID, filterGroupUUID, onChange }: LeagueFilterProps & FilterGroupProps) {
  const leagueFilters = useCategoryTreeStore((state) => state.leagueFilters);
  const updateLeaguesFilter = useCategoryTreeStore((state) => state.updateLeaguesFilter);
  const sportFilters = useCategoryTreeStore((state) => state.sportFilters);
  const sportsSelections = sportFilters(categoryUUID, filterGroupUUID);
  const { data: catalog, isLoading, error } = useCatalog();
  const leagues = catalog?.filteredLeaguesBy(sportsSelections);

  return (
    <LoadDataDecorator error={error} isLoading={isLoading} className={`${styles.filter}`}>
      <MultiSelectionFilter
        categoryUUID={categoryUUID}
        filterGroupUUID={filterGroupUUID}
        keyStr="league"
        label="Leagues"
        title="Select Leagues"
        items={choices(leagues || [])}
        filterSelections={leagueFilters}
        updateFilterSelection={updateLeaguesFilter}
        onChange={onChange}
        disabled={sportsSelections.length === 0}
      />
    </LoadDataDecorator>
  );
}
