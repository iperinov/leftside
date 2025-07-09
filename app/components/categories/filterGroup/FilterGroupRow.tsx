import { CaretSortIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex } from "@radix-ui/themes";
import type ClassNameProps from "~/components/shared/ClassNameProps";
import type { MenuItem } from "../../dropdownContextMenu/DropdownContextMenu";
import DropdownContextMenu from "../../dropdownContextMenu/DropdownContextMenu";
import styles from "../filters/Filters.module.css";
import FiltersGroup, { type FilterGroupProps } from "./FiltersGroup";
import type SortableTriggerProps from "~/components/shared/SortableTriggerProps";

interface FilterGroupRowProps extends FilterGroupProps {
  onDuplicate?: (categoryUUID: string, filterGroupUUID: string) => void;
  onDelete?: (categoryUUID: string, filterGroupUUID: string) => void;
  onReorder?: (categoryUUID: string, filterGroupUUID: string) => void;
}

export default function FiltersGroupRow({
  categoryUUID,
  filterGroupUUID,
  onDuplicate,
  onDelete,
  attributes,
  listeners,
}: FilterGroupRowProps & ClassNameProps & SortableTriggerProps) {
  const menuItems: MenuItem<{ categoryUUID: string; filterGroupUUID: string }>[] = [
    {
      name: "Duplicate",
      action: (context) => context && onDuplicate?.(context.categoryUUID, context.filterGroupUUID),
    },
    {
      name: "Delete",
      action: (context) => context && onDelete?.(context.categoryUUID, context.filterGroupUUID),
    },
  ];

  return (
    <Flex gap="2" align="center" justify="between" className={styles.filterGroupRow}>
      <CaretSortIcon {...attributes} {...listeners} className="nohover" />


      <FiltersGroup categoryUUID={categoryUUID} filterGroupUUID={filterGroupUUID} />

      <Box pr="3" pl="2">
        <DropdownContextMenu items={menuItems} context={{ categoryUUID, filterGroupUUID }} />
      </Box>
    </Flex>
  );
}
