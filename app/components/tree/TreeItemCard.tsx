import { CaretSortIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text } from "@radix-ui/themes";
import React, { useEffect } from "react";
import DropdownContextMenu from "../dropdownContextMenu/DropdownContextMenu";
import type SortableTriggerProps from "../shared/SortableTriggerProps";
import type TreeConfig from "./TreeConfig";
import styles from "./TreeItemCard.module.css";
import type TreeItemData from "./TreeItemData";

interface TreeItemCardProps<T extends TreeItemData<T>> {
  item: T;
  parent: T;
  level: number;
  dragging?: boolean;
}

export default function TreeItemCard<T extends TreeItemData<T>>({
  item,
  parent,
  level,
  attributes,
  listeners,
  dragging = false,
  ...config
}: TreeItemCardProps<T> & TreeConfig<T> & SortableTriggerProps) {
  const [focusAttention, setFocusAttention] = React.useState(false);
  const isSelectable = config.selection?.allowed(item);
  const enableReorder = config.reorder?.allowed(item, parent) && !item.pending;
  const isSelected = config.selection?.selectedID === item.id;
  const optionals = config.additionalElements?.getFor(item, level) || [];
  const contextMenu = config.contextMenu?.itemsFor?.(item) || [];

  useEffect(() => {
    if (!config.focusAttention?.allow(item)) return;
    setFocusAttention(true);
    const timeout = setTimeout(() => {
      setFocusAttention(false);
      config.focusAttention?.done(item);
    }, 1000);
    return () => clearTimeout(timeout);
  });

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
      data-selected={isSelected ? "true" : undefined}
      data-pending={item.pending ? "true" : undefined}
      data-focus-attention={focusAttention ? "true" : undefined}
      data-dragging={dragging ? "true" : undefined}
    >
      <Flex align="center" gap="1" className={styles.treeItemCardContent}>
        <CaretSortIcon data-hidden={enableReorder ? undefined : "true"} className={styles.treeItemCardReorderIcon} {...attributes} {...listeners} />

        <Box className={styles.treeItemCardLabel}>
          <Text wrap="pretty" title={item.name}>
            {item.name}
          </Text>
        </Box>

        {optionals.map((optional) => (
          <React.Fragment key={optional.key ?? undefined}>{optional.node}</React.Fragment>
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
