import { CaretSortIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import DropdownContextMenu from "../dropdownContextMenu/DropdownContextMenu";
import type TreeConfig from "./TreeConfig";
import styles from "./TreeItemCard.module.css";
import type TreeItemData from "./TreeItemData";

interface TreeItemCardProps<T extends TreeItemData<T>> {
  item: T;
  parent: T;
}

export default function TreeItemCard<T extends TreeItemData<T>>({ item, parent, ...config }: TreeItemCardProps<T> & TreeConfig<T>) {
  const isSelectable = config.selection?.allowed(item);
  const enableReorder = config.reorder?.allowed(item, parent) && !item.pending;

  return (
    <Flex
      align="center"
      py="2"
      px="1"
      justify="between"
      width="100%"
      className={`${styles.treeItemCard}  ${styles.noselect}`}
      onClick={isSelectable ? () => config.selection?.handler(item) : undefined}
      draggable={enableReorder ? "true" : undefined}
      data-selectable={isSelectable ? "true" : undefined}
      data-selected={config.selection?.selectedID === item.id ? "true" : undefined}
      data-pending={item.pending ? "true" : undefined}
    >
      <Flex align="center" gap="1">
        {/* Reorder Button */}
        <Button
          className={`${styles.reorderButton} nohover`}
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
      {config.contextMenu && config.contextMenu.menuItems.length > 0 && (
        <Box pr="3" pl="2">
          <DropdownContextMenu items={config.contextMenu.menuItems} context={item} />
        </Box>
      )}
    </Flex>
  );
}
