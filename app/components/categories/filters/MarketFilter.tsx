import { useMemo, useState } from "react";
import type { Event } from "~/api/ocs/ocs.types";
import MultiSelectDialog from "~/components/dialogs/MultiSelectDialog";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import useMarketsForLeagues from "~/hooks/useMarketsForLeagues";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { allItemData } from "../AllItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import Filter from "./Filter";
import styles from "./Filters.module.css";
import type ItemData from "~/types/ItemData";

interface MarketFilterProps {
  onChange?: (selectedIDs: string[]) => void;
}

function toItemData(events: Event[]): ItemData<string>[] {
  return events.map((event) => ({
    id: String(event.id),
    name: event.description,
  }));
}

export default function MarketFilter({
  categoryID,
  filterGroupID,
  onChange,
}: MarketFilterProps & FilterGroupProps) {
  const marketFilters = useCategoryTreeStore((state) => state.marketFilters);
  const leagueFilters = useCategoryTreeStore((state) => state.leagueFilters);
  const selectedLeagues = leagueFilters(categoryID, filterGroupID);
  const { data, isLoading, error } = useMarketsForLeagues(selectedLeagues);
  const updateMarketsFilter = useCategoryTreeStore(
    (state) => state.updateMarketsFilter,
  );
  const [show, setShow] = useState(false);
  const allItem = useMemo(() => allItemData(), []);
  const selections = marketFilters(categoryID, filterGroupID);
  const items = data ? toItemData(data) : [];

  return (
    <>
      <LoadDataDecorator
        error={error}
        isLoading={isLoading}
        className={`${styles.filter}`}
      >
        <Filter
          key={"market"}
          label={"Markets"}
          values={selections.map((id) => {
            if (id === allItem.id) return allItem.name;
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
          items={items}
          includeAllItem={true}
          onConfirm={(selectedIDs) => {
            updateMarketsFilter(categoryID, filterGroupID, selectedIDs);
            setShow(false);
          }}
          onCancel={() => setShow(false)}
          title="Select Markets"
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
