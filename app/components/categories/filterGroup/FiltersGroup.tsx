import { Flex } from "@radix-ui/themes";
import styles from "../filters/Filters.module.css";
import GroupByFilter from "../filters/GroupByFilter";
import LeaguesFilter from "../filters/LeaguesFilter";
import LimitFilter from "../filters/LimitFilter";
import MarketFilter from "../filters/MarketFilter";
import SortByFilter from "../filters/SortByFilter";
import SportsFilter from "../filters/SportsFilter";
import StatusFilter from "../filters/StatusFilter";
import TimeFilter from "../filters/TimeFilter";

export interface FilterGroupProps {
  categoryID: string;
  filterGroupID: string;
}

export default function FiltersGroup(props: FilterGroupProps) {
  return (
    <Flex className={styles.filtersGroup} gap="1" align="center" wrap={"wrap"}>
      <SportsFilter {...props} />
      <LeaguesFilter {...props} />
      <MarketFilter {...props} />
      <StatusFilter {...props} />
      <TimeFilter {...props} />
      <GroupByFilter {...props} />
      <SortByFilter {...props} />
      <LimitFilter {...props} />
    </Flex>
  );
}
