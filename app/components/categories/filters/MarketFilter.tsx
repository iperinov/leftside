import type { FiltersTypeString } from "~/api/sccs/types.gen";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import useFilteredMarketsBy from "~/hooks/useFilteredMarketsBy";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ItemData from "~/types/ItemData";
import type { Event } from "~/types/sport/types";
import { allItemNumber, isAllFilter } from "../AllItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import styles from "./Filters.module.css";
import MultiSelectionFilter from "./MultiSelectionFilter";

interface MarketFilterProps {
  onChange?: (selectedIDs: number[]) => void;
}

function choices(markets: Event[]): ItemData<number>[] {
  return markets.map((market) => ({
    id: market.id,
    name: market.description,
  }));
}

export default function MarketFilter({ categoryUUID, filterGroupUUID, onChange }: MarketFilterProps & FilterGroupProps) {
  const marketFilters = useCategoryTreeStore((state) => state.marketFilters);
  const sportFilters = useCategoryTreeStore((state) => state.sportFilters);
  const leagueFilters = useCategoryTreeStore((state) => state.leagueFilters);
  const updateMarketsFilter = useCategoryTreeStore((state) => state.updateMarketsFilter);
  const sportFilter = sportFilters(categoryUUID, filterGroupUUID);
  const leagueFilter = leagueFilters(categoryUUID, filterGroupUUID);
  const { data: markets, isLoading, error } = useFilteredMarketsBy(sportFilter, leagueFilter);
  const filterValue = marketFilters(categoryUUID, filterGroupUUID).value;
  const selections = isAllFilter(filterValue) ? [allItemNumber.id] : (filterValue as number[]);

  return (
    <LoadDataDecorator error={error} isLoading={isLoading} className={`${styles.filter}`}>
      <MultiSelectionFilter
        categoryUUID={categoryUUID}
        filterGroupUUID={filterGroupUUID}
        keyStr="market"
        label="Markets"
        title="Select Markets"
        items={choices(markets || [])}
        selections={selections}
        updateFilterSelection={updateMarketsFilter}
        onChange={onChange}
        disabled={!isAllFilter(sportFilter) || (sportFilter.value as FiltersTypeString).length === 0}
      />
    </LoadDataDecorator>
  );
}
