
import { Flex } from "@radix-ui/themes";
import AddTreeItemButton from "./AddTreeItemButton";
import type TreeConfig from "./TreeConfig";
import type TreeItemData from "./TreeItemData";
import SortableTreeItems from "./SortableTreeItems";
import TreeItems from "./TreeItems";

interface TreeProps<T extends TreeItemData<T>> {
  root: T;
  level: number;
}

export default function Tree<T extends TreeItemData<T>>({ root, level, ...config }: TreeProps<T> & TreeConfig<T>) {
  const isReorderEnabled = config.reorder?.enabled || false;
  return (
    <Flex direction={"column"} gap="2" ml={level === 0 ? undefined : "5"}>
      {/* Render items in section */}
      {isReorderEnabled 
        ? <SortableTreeItems root={root} level={level} {...config}/>
        : <TreeItems root={root} level={level} {...config} />
      }
      {/* Add button for the items section */}
      {config.addToParent?.allowed(level, root) && (
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
