import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import Tree from "./Tree";
import type TreeConfig from "./TreeConfig";
import TreeItemCard from "./TreeItemCard";
import type TreeItemData from "./TreeItemData";

interface TreeItemProps {
  item: TreeItemData;
  level: number;
  parent: TreeItemData;
}

export default function TreeItem({
  item,
  level,
  parent,
  ...config
}: TreeItemProps & TreeConfig) {
  const hasChildren = item.children && item.children.length > 0;
  const canExpandItem =
    (config.expand?.allowed(item, level) || false) &&
    (hasChildren || config.addToParent?.allowed(level + 1, item) || false);
  const itemExpanded = config.expand?.itemIDs.includes(item.id);

  return (
    <>
      <Flex gap="2" align="center">
        <IconButton
          style={{ visibility: canExpandItem ? undefined : "hidden" }}
          onClick={() => config.expand?.handler(item, !itemExpanded)}
          variant="ghost"
        >
          {itemExpanded ? <MinusIcon /> : <PlusIcon />}
        </IconButton>

        <TreeItemCard item={item} parent={parent} {...config} />
      </Flex>

      {canExpandItem && itemExpanded && (
        <Tree root={item} level={level + 1} {...config} />
      )}
    </>
  );
}
