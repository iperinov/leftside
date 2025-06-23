import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Text, Flex, IconButton, Button } from "@radix-ui/themes";
import { useState } from "react";
import AddTreeItemButton from "./AddTreeItemButton";
import type TreeItemData from "./TreeItemData";
import type TreeConfig from "./TreeConfig";
import TreeItemRow from "./TreeItemRow";

interface TreeItemProps {
  data: TreeItemData;
  expand?: boolean;
  crumbs: string[];
}

export default function TreeItem({ data, expand, crumbs = [], ...config }: TreeItemProps & TreeConfig) {
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
            <TreeItem key={child.id} data={child} crumbs={[...crumbs, data.id]} {...config} />
          ))}
          {config.onAddLevel && <AddTreeItemButton crumbs={[...crumbs, data.id]} onAddLevel={config.onAddLevel} />}
        </Flex>
      )}
    </>
  );
}
