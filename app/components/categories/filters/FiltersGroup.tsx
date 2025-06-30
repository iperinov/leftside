import { Flex } from "@radix-ui/themes";
import styles from "./Filters.module.css";
import SportsFilter from "./SportsFilter";
import LeaguesFilter from "./LeaguesFilter";
import MarketFilter from "./MarketFilter";
import StatusFilter from "./StatusFilter";
import TimeFilter from "./TimeFilter";
import GroupByFilter from "./GroupByFilter";
import SortByFilter from "./SortByFilter";
import LimitFilter from "./LimitFilter";

export interface FilterGroupProps {
  categoryID: string;
  filterGroupID: string;
}

export default function FiltersGroup(props: FilterGroupProps) {
  return (
    <Flex className={styles.filtersGroup} gap="1" align="center" wrap={"wrap"}>
      <SportsFilter {...props} />
      <LeaguesFilter {...props} />
      {/*<MarketFilter {...props} />*/}
      <StatusFilter {...props} />
      <TimeFilter {...props} />
      <GroupByFilter {...props} />
      <SortByFilter {...props} />
      <LimitFilter {...props} />
    </Flex>
  );
}
