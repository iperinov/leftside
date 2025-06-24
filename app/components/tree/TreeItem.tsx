import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Text, Flex, IconButton, Button } from "@radix-ui/themes";
import { useState } from "react";
import AddTreeItemButton from "./AddTreeItemButton";
import type TreeItemData from "./TreeItemData";
import type TreeConfig from "./TreeConfig";
import TreeItemRow from "./TreeItemRow";

interface TreeItemProps {
  data: TreeItemData;
  level?: number;
  parentID?: string;
}

export default function TreeItem({ data, level = 0, parentID, ...config }: TreeItemProps & TreeConfig) {
  const hasChildren = data.children && data.children.length > 0;
  const shouldShowExpandButton = !config.isFinalNode?.(data) && (config.onAddLevel || hasChildren);
  const itemExpanded = config.expandedItems.includes(data.id);

  return (
    <>
      <Flex gap="2" align="center">
        <IconButton
          style={{ visibility: shouldShowExpandButton ? undefined : "hidden" }}
          onClick={() => config.expandItem(data.id, !itemExpanded)}
          variant="ghost"
        >
          {itemExpanded ? <MinusIcon /> : <PlusIcon />}
        </IconButton>

        <TreeItemRow data={data} parentID={data.id} {...config} />
      </Flex>

      {shouldShowExpandButton && itemExpanded && (
        <Flex direction="column" gap="2" ml="5">
          {hasChildren && data.children!.map((child) => (
            <TreeItem key={child.id} data={child} parentID={data.id} {...config} />
          ))}
          {config.onAddLevel && (
            <AddTreeItemButton parentID={data.id} onAddLevel={config.onAddLevel} mutationInProgress={config.mutationInProgress} />
          )}
        </Flex>
      )}
    </>
  );
}
