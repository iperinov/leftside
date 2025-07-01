import { useState } from "react";
import type { League } from "~/api/ocs/ocs.types";
import MultiSelectDialog from "~/components/dialogs/MultiSelectDialog";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import useLeaguesForSports from "~/hooks/useLeaguesForSports";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { allItemData } from "../AllItemData";
import type ItemData from "../ItemData";
import type { FilterGroupProps } from "../filterGroup/FiltersGroup";
import Filter from "./Filter";
import styles from "./Filters.module.css";

function toItemData(leagues: League[]): ItemData<string>[] {
  return [
    allItemData,
    ...leagues.map((league) => ({ id: String(league.id), name: league.name })),
  ];
}

export default function LeaguesFilter({
  categoryID,
  filterGroupID,
}: FilterGroupProps) {
  const leagueFilters = useCategoryTreeStore((state) => state.leagueFilters);
  const sportFilters = useCategoryTreeStore((state) => state.sportFilters);
  const sportsSelections = sportFilters(categoryID, filterGroupID);
  const { data, isLoading, error } = useLeaguesForSports(sportsSelections);
  const updateLeaguesFilter = useCategoryTreeStore(
    (state) => state.updateLeaguesFilter,
  );
  const [show, setShow] = useState(false);
  const selections = leagueFilters(categoryID, filterGroupID);

  return (
    <>
      <LoadDataDecorator
        error={error}
        isLoading={isLoading}
        className={`${styles.filter}`}
      >
        <Filter
          key={"league"}
          label={"Leagues"}
          values={selections.map((id) => {
            if (id === allItemData.id) return "All";
            const league = data?.find((item) => String(item.id) === id);
            return league ? league.name : "";
          })}
          onClick={() => setShow(true)}
          className={`${styles.filter}`}
          disabled={sportsSelections.length === 0}
        />
      </LoadDataDecorator>

      {show && data && (
        <MultiSelectDialog<string>
          items={toItemData(data)}
          onConfirm={(selectedIDs) => {
            updateLeaguesFilter(categoryID, filterGroupID, selectedIDs);
            setShow(false);
          }}
          onCancel={() => setShow(false)}
          title="Select Leagues"
          valid={(values) =>
            values.length !== selections.length ||
            values.some((v) => !selections.includes(v))
          }
          defaultSelectedIDs={selections}
          onSelectionChange={(selectedIDs) =>
            !selectedIDs.includes(allItemData.id)
              ? selectedIDs
              : [allItemData.id]
          }
        />
      )}
    </>
  );
}
