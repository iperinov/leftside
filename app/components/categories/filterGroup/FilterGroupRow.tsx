import { CaretSortIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex } from "@radix-ui/themes";
import type ClassNameProps from "~/components/shared/ClassNameProps";
import type { MenuItem } from "../../dropdownContextMenu/DropdownContextMenu";
import DropdownContextMenu from "../../dropdownContextMenu/DropdownContextMenu";
import styles from "../filters/Filters.module.css";
import FiltersGroup, { type FilterGroupProps } from "./FiltersGroup";

interface FilterGroupRowProps extends FilterGroupProps {
  onDuplicate?: (categoryID: string, filterGroupID: string) => void;
  onDelete?: (categoryID: string, filterGroupID: string) => void;
  onReorder?: () => void;
}

export default function FiltersGroupRow({ categoryUUID, filterGroupUUID, onDuplicate, onDelete, onReorder }: FilterGroupRowProps & ClassNameProps) {
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
      <Button variant="ghost" className="nohover" onClick={onReorder}>
        <CaretSortIcon />
      </Button>

      <FiltersGroup categoryUUID={categoryUUID} filterGroupUUID={filterGroupUUID} />

      <Box pr="3" pl="2">
        <DropdownContextMenu items={menuItems} context={{ categoryUUID, filterGroupUUID }} />
      </Box>
    </Flex>
  );
}
