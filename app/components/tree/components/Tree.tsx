import { Box, Flex } from "@radix-ui/themes";
import type TreeConfig from "../common/TreeConfig";
import type TreeItemData from "../common/TreeItemData";
import TreeItem from "./TreeItem";
import AddTreeItemButton from "./AddTreeItemButton";

interface TreeProps {
  root: TreeItemData;
  level: number;
}

export default function Tree({ root, level, ...config }: TreeProps & TreeConfig) {
  return (
    <Flex direction={"column"} gap="2" ml={level === 0 ? undefined : "5"}>
      {/* Render items in section */}
      {root.children && root.children.map((child) => (
        <TreeItem key={child.id} item={child} level={level} parent={root} {...config} />
      ))}

      {/* Add button for the items section */}
      {config.addToParent && config.addToParent.allowed(level, root) && (
        <AddTreeItemButton
          onAddLevel={config.addToParent.handler}
          addLevelText={config.addToParent.toString}
          level={level}
          parent={root}
          isInProgress={config.addToParent.inProgressID === root.id}
        />
      )}
    </Flex>
  );
}
