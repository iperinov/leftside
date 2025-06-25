import { CaretSortIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import DropdownContextMenu from "../../dropdownContextMenu/DropdownContextMenu";
import type TreeItemData from "../common/TreeItemData";
import type TreeConfig from "../common/TreeConfig";
import styles from "./TreeItemCard.module.css";

interface TreeItemCardProps {
  item: TreeItemData;
  parent: TreeItemData;
}

export default function TreeItemCard({ item, parent, ...config }: TreeItemCardProps & TreeConfig) {
  const isSelectable = config.selection?.allowed(item)
  const enableReorder = config.reorder && config.reorder.allowed(item, parent) && !item.pending;

  return (
    <Flex
      align="center"
      py="2"
      px="1"
      justify="between"
      width="100%"
      className={`${styles.treeItemCard}  ${styles.noselect}`}
      onClick={isSelectable ? () => config.selection && config.selection.handler(item) : undefined}
      draggable={enableReorder ? "true" : undefined}
      data-selectable={isSelectable ? "true" : undefined}
      data-selected={config.selection?.selectedID === item.id ? "true" : undefined}
      data-pending={item.pending ? "true" : undefined}
    >
      <Flex align="center" gap="1">
        {/* Reorder Button */}
        <Button
          className={styles.reorderButton}
          variant="ghost"
          onClick={(event) => {
            event.stopPropagation();
          }}
          data-hidden={enableReorder ? undefined : "true"}
        >
          <CaretSortIcon />
        </Button>

        {/* Name */}
        <Text wrap="pretty">{item.name}</Text>

        {/* TODO: Flags */}
      </Flex>

      {/* Context menu */}
      {config.menuItems && config.menuItems.length > 0 && (
        <Box pr="3" pl="2">
          <DropdownContextMenu items={config.menuItems} context={item} />
        </Box>
      )}
    </Flex>
  );
}
