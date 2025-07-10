import { CaretSortIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";
import DropdownContextMenu from "../dropdownContextMenu/DropdownContextMenu";
import type SortableTriggerProps from "../shared/SortableTriggerProps";
import type TreeConfig from "./TreeConfig";
import styles from "./TreeItemCard.module.css";
import type TreeItemData from "./TreeItemData";

interface TreeItemCardProps<T extends TreeItemData<T>> {
  item: T;
  parent: T;
  dragging?: boolean;
}

export default function TreeItemCard<T extends TreeItemData<T>>({
  item,
  parent,
  attributes,
  listeners,
  dragging = false,
  ...config
}: TreeItemCardProps<T> & TreeConfig<T> & SortableTriggerProps) {
  const isSelectable = config.selection?.allowed(item);
  const enableReorder = config.reorder?.allowed(item, parent) && !item.pending;
  const optionals = config.additionalElements?.getFor(item) || [];
  const contextMenu = config.contextMenu?.itemsFor?.(item) || [];

  return (
    <Flex
      align="center"
      py="2"
      px="1"
      justify="between"
      width="100%"
      className={`${styles.treeItemCard}  noselect`}
      onClick={isSelectable ? () => config.selection?.handler(item) : undefined}
      data-selectable={isSelectable ? "true" : undefined}
      data-selected={config.selection?.selectedID === item.id ? "true" : undefined}
      data-pending={item.pending ? "true" : undefined}
      data-changed={item.changed ? "true" : undefined}
      data-dragging={dragging ? "true" : undefined}
    >
      <Flex align="center" gap="1">
        <CaretSortIcon data-hidden={enableReorder ? undefined : "true"} {...attributes} {...listeners} />
        <Text wrap="pretty">{item.name}</Text> 
        {optionals.map((optional) => ( 
          <React.Fragment key={optional.key ? optional.key : undefined}>{optional.node}</React.Fragment>
        ))}
      </Flex>

      {contextMenu.length > 0 && (
        <Box pr="3" pl="2">
          <DropdownContextMenu items={contextMenu} context={item} />
        </Box>
      )}
    </Flex>
  );
}
