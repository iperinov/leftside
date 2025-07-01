import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import Tree from "./Tree";
import type TreeConfig from "./TreeConfig";
import TreeItemCard from "./TreeItemCard";
import type TreeItemData from "./TreeItemData";

interface TreeItemProps<T extends TreeItemData<T>> {
  item: T;
  level: number;
  parent: T;
}

export default function TreeItem<T extends TreeItemData<T>>({
  item,
  level,
  parent,
  ...config
}: TreeItemProps<T> & TreeConfig<T>) {
  const hasChildren = item.children && item.children.length > 0;
  const canExpandItem =
    (config.expand?.allowed(item, level) || false) &&
    (hasChildren || config.addToParent?.allowed(level + 1, item) || false);
  const itemExpanded = config.expand?.itemIDs.includes(item.id);
  const itemFiltered = config.filter
    ? !item.name.toLowerCase().includes(config.filter?.filter.toLowerCase())
    : false;

  return (
    <>
      {!itemFiltered && (
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
      )}

      {canExpandItem && itemExpanded && (
        <Tree root={item} level={level + 1} {...config} />
      )}
    </>
  );
}
