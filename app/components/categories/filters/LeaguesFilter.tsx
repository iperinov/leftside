import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import Filter from "./Filter";
import { use, useEffect, useState } from "react";
import MultiSelectDialog from "~/components/dialogs/MultiSelectDialog";
import type ItemData from "../ItemData";
import type { League } from "~/api/ocs/ocs.types";
import styles from "./Filters.module.css";
import useLeaguesForSports from "~/hooks/useLeaguesForSports";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type { FilterGroupProps } from "./FiltersGroup";

function toItemData(leagues: League[]): ItemData<string>[] {
  return leagues.map((league) => ({ id: league.uuid, name: league.name }));
}

export default function LeaguesFilter({ categoryID, filterGroupID }: FilterGroupProps) {
  const selections = useCategoryTreeStore((state) => state.leagueFilters(categoryID, filterGroupID));
  const sportsSelections = useCategoryTreeStore((state) => state.sportFilters(categoryID, filterGroupID));
  const { data, isLoading, error } = useLeaguesForSports(sportsSelections);
  const updateLeaguesFilter = useCategoryTreeStore((state) => state.updateLeaguesFilter);
  const [show, setShow] = useState(false);
  
  return (
    <>
      <LoadDataDecorator error={error} isLoading={isLoading} className={`${styles.filter}`}>
        <Filter
          key={"league"}
          label={"Leagues"}
          values={selections.map((id) => {
            const league = data?.find((item) => item.uuid === id);
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
          valid={(values) => values.length !== selections.length || values.some((v) => !selections.includes(v))}
          defaultSelectedIDs={selections}
        />
      )}
    </>
  );
}
