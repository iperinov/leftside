import type ItemData from "../ItemData";
import type { Event } from "~/api/ocs/ocs.types";
import type { FilterGroupProps } from "./FiltersGroup";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import useMarketsForLeagues from "~/hooks/useMarketsForLeagues";
import { useState } from "react";
import Filter from "./Filter";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import styles from "./Filters.module.css";
import MultiSelectDialog from "~/components/dialogs/MultiSelectDialog";
import { allStringItemData } from "../ItemData";

interface MarketFilterProps {
  onChange?: (selectedIDs: string[]) => void;
}

function toItemData(events: Event[]): ItemData<string>[] {
  return [allStringItemData, ...events.map((event) => ({ id: String(event.id), name: event.description }))];
}

export default function MarketFilter({ categoryID, filterGroupID, onChange }: MarketFilterProps & FilterGroupProps) {
  const marketFilters = useCategoryTreeStore((state) => state.marketFilters);
  const leagueFilters = useCategoryTreeStore((state) => state.leagueFilters);
  const selectedLeagues = leagueFilters(categoryID, filterGroupID);
  const { data, isLoading, error } = useMarketsForLeagues(selectedLeagues);
  const updateMarketsFilter = useCategoryTreeStore((state) => state.updateMarketsFilter);
  const [show, setShow] = useState(false);
  const selections = marketFilters(categoryID, filterGroupID);

  return (
    <>
      <LoadDataDecorator error={error} isLoading={isLoading} className={`${styles.filter}`}>
        <Filter
          key={"market"}
          label={"Markets"}
          values={selections.map((id) => {
            if (id === allStringItemData.id) return "All";
            const event = data?.find((event) => String(event.id) === id);
            return event ? event.description : "";
          })}
          onClick={() => setShow(true)}
          className={`${styles.filter}`}
          disabled={selectedLeagues.length === 0}
        />
      </LoadDataDecorator>

      {show && data && (
        <MultiSelectDialog<string>
          items={toItemData(data)}
          onConfirm={(selectedIDs) => {
            updateMarketsFilter(categoryID, filterGroupID, selectedIDs);
            setShow(false);
          }}
          onCancel={() => setShow(false)}
          title="Select Markets"
          valid={(values) => values.length !== selections.length || values.some((v) => !selections.includes(v))}
          defaultSelectedIDs={selections}
          onSelectionChange={(selectedIDs) => !selectedIDs.includes(allStringItemData.id) ? selectedIDs : [allStringItemData.id]}
        />
      )}
    </>
  );
}
