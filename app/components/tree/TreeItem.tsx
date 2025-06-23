import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Text, Flex, IconButton, Button } from "@radix-ui/themes";
import { useState } from "react";
import AddTreeItemButton from "./AddTreeItemButton";
import type TreeItemData from "./TreeItemData";
import type TreeConfig from "./TreeConfig";
import TreeItemRow from "./TreeItemRow";
import { maxLevel } from "~/common/constants";

interface TreeItemProps {
  data: TreeItemData;
  level?: number;
  expand?: boolean;
  parentID?: string;
}

export default function TreeItem({ data, level = 0, expand, parentID, ...config }: TreeItemProps & TreeConfig) {
  const [expanded, setExapanded] = useState(expand || false);
  const hasChildren = data.children && data.children.length > 0;
  const shouldShowExpandButton = level < maxLevel - 1 && (config.onAddLevel || hasChildren);

  return (
    <>
      <Flex gap="2" align="center">
        <IconButton
          style={{ visibility: shouldShowExpandButton ? undefined : "hidden" }}
          onClick={() => setExapanded(!expanded)}
          variant="ghost"
        >
          {expanded ? <MinusIcon /> : <PlusIcon />}
        </IconButton>

        <TreeItemRow data={data} parentID={data.id} level={level + 1} {...config} />
      </Flex>

      {shouldShowExpandButton && expanded && (
        <Flex direction="column" gap="2" ml="5">
          {hasChildren && data.children!.map((child) => (
            <TreeItem key={child.id} data={child} level={level + 1} parentID={data.id} {...config} />
          ))}
          {config.onAddLevel && (
            <AddTreeItemButton parentID={data.id} onAddLevel={config.onAddLevel} level={level + 1} mutationInProgress={config.mutationInProgress} />
          )}
        </Flex>
      )}
    </>
  );
}
