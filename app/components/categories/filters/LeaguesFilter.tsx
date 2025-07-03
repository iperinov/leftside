import type { League } from "~/api/ocs/ocs.types";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import useLeaguesForSports from "~/hooks/useLeaguesForSports";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ItemData from "~/types/ItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import styles from "./Filters.module.css";
import MultiSelectionFilter from "./MultiSelectionFilter";

interface LeagueFilterProps {
  onChange?: (selectedIDs: string[]) => void;
}

function choices(leagues: League[]): ItemData<string>[] {
  return leagues.map((league) => ({
    id: String(league.id),
    name: league.name,
  }));
}

export default function LeaguesFilter({
  categoryID,
  filterGroupID,
  onChange,
}: LeagueFilterProps & FilterGroupProps) {
  const leagueFilters = useCategoryTreeStore((state) => state.leagueFilters);
  const updateLeaguesFilter = useCategoryTreeStore(
    (state) => state.updateLeaguesFilter,
  );
  const sportFilters = useCategoryTreeStore((state) => state.sportFilters);
  const sportsSelections = sportFilters(categoryID, filterGroupID);
  const {
    data: leagues,
    isLoading,
    error,
  } = useLeaguesForSports(sportsSelections);

  return (
    <LoadDataDecorator
      error={error}
      isLoading={isLoading}
      className={`${styles.filter}`}
    >
      <MultiSelectionFilter
        categoryID={categoryID}
        filterGroupID={filterGroupID}
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
