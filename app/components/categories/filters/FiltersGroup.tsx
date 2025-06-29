import { Flex } from "@radix-ui/themes";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import styles from "./Filters.module.css";
import SportsFilter from "./SportsFilter";
import LeaguesFilter from "./LeaguesFilter";
import { useState } from "react";

export interface FilterGroupProps {
  categoryID: string;
  filterGroupID: string;
}

export default function FiltersGroup(props: FilterGroupProps) {
   return (
    <Flex className={styles.filtersGroup} gap="2" align="center">
      <SportsFilter {...props}/>
      <LeaguesFilter {...props}/>
    </Flex>
  );
}

/*<Filter key={"group"} type={"group"} values={filterGroup.groupBy ? [filterGroup.groupBy] : []} onClick={() => setActiveFilter("group")} />
        <Filter key={"sort"} type={"sort"} values={filterGroup.order ? [filterGroup.order] : []} onClick={() => setActiveFilter("sort")} />
        <Filter key={"limit"} type={"limit"} values={filterGroup.limit ? [`${filterGroup.limit}`] : []} onClick={() => setActiveFilter("limit")} />
        activeFilter && activeFilter === "sport" && (
          <MultiSelectDialog<string>
            useItemsHook={useRealSportsItems}
            onConfirm={(selectedIDs) => console.log("Selected sports:", selectedIDs)}
            onCancel={clearActiveFilter}
            title="Select Sports"
          />
        ) //||
        //*(activeFilter === "region" && <MultiSelectDialog />) ||
        //(activeFilter === "league" && <MultiSelectDialog />) ||
        //*(activeFilter === "game" && <MultiSelectDialog />) ||
        //*(activeFilter === "period" && <MultiSelectDialog />) ||
        //(activeFilter === "market" && <SelectDialog />) ||
        //(activeFilter === "time" && <SelectDialog />) ||
        //(activeFilter === "status" && <SelectDialog />)}
        //(activeFilter === "group" && <SelectDialog />) ||
        //(activeFilter === "sort" && <SelectDialog />) ||
        //(activeFilter === "limit" && <SelectDialog />)
      }
    </> */
