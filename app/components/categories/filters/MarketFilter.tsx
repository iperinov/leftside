import type { Event } from "~/api/ocs/ocs.types";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import useFilteredMarketsBy from "~/hooks/useFilteredMarketsBy";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ItemData from "~/types/ItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import styles from "./Filters.module.css";
import MultiSelectionFilter from "./MultiSelectionFilter";

interface MarketFilterProps {
  onChange?: (selectedIDs: string[]) => void;
}

function choices(markets: Event[]): ItemData<string>[] {
  return markets.map((market) => ({
    id: String(market.id),
    name: market.description,
  }));
}

export default function MarketFilter({ categoryUUID, filterGroupUUID, onChange }: MarketFilterProps & FilterGroupProps) {
  const marketFilters = useCategoryTreeStore((state) => state.marketFilters);
  const sportFilters = useCategoryTreeStore((state) => state.sportFilters);
  const leagueFilters = useCategoryTreeStore((state) => state.leagueFilters);
  const updateMarketsFilter = useCategoryTreeStore((state) => state.updateMarketsFilter);
  const sportsSelection = sportFilters(categoryUUID, filterGroupUUID);
  const leaguesSelection = leagueFilters(categoryUUID, filterGroupUUID);
  const { data: markets, isLoading, error } = useFilteredMarketsBy(sportsSelection, leaguesSelection);

  return (
    <LoadDataDecorator error={error} isLoading={isLoading} className={`${styles.filter}`}>
      <MultiSelectionFilter
        categoryUUID={categoryUUID}
        filterGroupUUID={filterGroupUUID}
        keyStr="market"
        label="Markets"
        title="Select Markets"
        items={choices(markets || [])}
        filterSelections={marketFilters}
        updateFilterSelection={updateMarketsFilter}
        onChange={onChange}
        disabled={sportsSelection.length === 0}
      />
    </LoadDataDecorator>
  );
}
