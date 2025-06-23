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
  expand?: boolean;
  parentID?: string;
}

export default function TreeItem({ data, level = 0, expand, parentID, ...config }: TreeItemProps & TreeConfig) {
  const [expanded, setExapanded] = useState(expand || false);
  const hasChildren = data.children && data.children.length > 0;

  return (
    <>
      <Flex gap="2" align="center">
        <IconButton style={{ visibility: hasChildren ? undefined : "hidden" }} onClick={() => setExapanded(!expanded)} variant="ghost">
          {expanded ? <MinusIcon /> : <PlusIcon />}
        </IconButton>

        <TreeItemRow data={data} parentID={data.id} {...config} />
      </Flex>

      {hasChildren && expanded && (
        <Flex direction="column" gap="2" ml="5">
          {data.children!.map((child) => (
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
