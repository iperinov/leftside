import { CaretSortIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex } from "@radix-ui/themes";
import type ClassNameProps from "~/components/shared/ClassNameProps";
import type SortableTriggerProps from "~/components/shared/SortableTriggerProps";
import type { MenuItem } from "../../dropdownContextMenu/DropdownContextMenu";
import DropdownContextMenu from "../../dropdownContextMenu/DropdownContextMenu";
import styles from "../filters/Filters.module.css";
import FiltersGroup, { type FilterGroupProps } from "./FiltersGroup";

interface FilterGroupRowProps extends FilterGroupProps {
  menuItems?: MenuItem<{ categoryUUID: string; filterGroupUUID: string }>[];
  dragging?: boolean;
}

export default function FiltersGroupRow({
  categoryUUID,
  filterGroupUUID,
  menuItems,
  dragging,
  attributes,
  listeners,
}: FilterGroupRowProps & ClassNameProps & SortableTriggerProps) {
  return (
    <Flex gap="2" align="center" justify="between" className={styles.filterGroupRow}>
      <CaretSortIcon {...attributes} {...listeners} className="nohover" />

      <FiltersGroup categoryUUID={categoryUUID} filterGroupUUID={filterGroupUUID} />

      <Box pr="3" pl="2">
        <DropdownContextMenu items={menuItems || []} context={{ categoryUUID, filterGroupUUID }} />
      </Box>
    </Flex>
  );
}
