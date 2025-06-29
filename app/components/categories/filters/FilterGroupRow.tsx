import { CaretSortIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex } from "@radix-ui/themes";
import type { MenuItem } from "../../dropdownContextMenu/DropdownContextMenu";
import DropdownContextMenu from "../../dropdownContextMenu/DropdownContextMenu";
import FiltersGroup from "./FiltersGroup";
import type { FilterGroup } from "~/api/scs/configurations/config.types";
import type ClassNameProps from "~/components/shared/ClassNameProps";
import styles from "./Filters.module.css";

interface FilterGroupRowProps {
  categoryID: string;
  filterGroupID: string;
  onReorder?: () => void;
}

export default function FiltersGroupRow({ categoryID, filterGroupID, onReorder }: FilterGroupRowProps & ClassNameProps) {
  const menuItems: MenuItem<FilterGroup>[] = [
    { name: "Duplicate", action: (context) => console.log("Duplicate", context) },
    { name: "Delete", action: (context) => console.log("Delete", context) },
  ];

  return (
    <Flex gap="2" align="center" justify="between" className={styles.filterGroupRow}>
      <Button variant="ghost" className="nohover" onClick={onReorder}>
        <CaretSortIcon />
      </Button>

      <FiltersGroup categoryID={categoryID} filterGroupID={filterGroupID} />

      <Box pr="3" pl="2">
        <DropdownContextMenu items={menuItems}/>
      </Box>
    </Flex>
  );
}
