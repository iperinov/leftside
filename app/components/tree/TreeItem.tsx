import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import type ClassNameProps from "../shared/ClassNameProps";
import type SortableTriggerProps from "../shared/SortableTriggerProps";
import Tree from "./Tree";
import type TreeConfig from "./TreeConfig";
import TreeItemCard from "./TreeItemCard";
import type TreeItemData from "./TreeItemData";

export interface TreeItemProps<T extends TreeItemData<T>> {
  item: T;
  level: number;
  parent: T;
  dragging?: boolean;
}

export default function TreeItem<T extends TreeItemData<T>>({
  item,
  level,
  parent,
  dragging = false,
  attributes,
  listeners,
  ...config
}: TreeItemProps<T> & TreeConfig<T> & SortableTriggerProps & ClassNameProps) {
  const hasChildren = item.children && item.children.length > 0;
  const canExpandItem = (config.expand?.allowed(item, level) || false) && (hasChildren || config.addToParent?.allowed(level + 1, item) || false);
  const itemExpanded = config.expand?.itemIDs.includes(item.id);
  const hideItem = config.filter ? config.filter.hideItem?.(item) : false;

  return !hideItem && (
    <>
      <Flex gap="2" align="center">
        <IconButton
          style={{ visibility: !dragging && canExpandItem ? undefined : "hidden" }}
          onClick={() => config.expand?.handler(item, !itemExpanded)}
          variant="ghost"
        >
          {itemExpanded ? <MinusIcon /> : <PlusIcon />}
        </IconButton>

        <TreeItemCard item={item} parent={parent} level={level} attributes={attributes} listeners={listeners} dragging={dragging} {...config} />
      </Flex>

      {!dragging && canExpandItem && itemExpanded && <Tree root={item} level={level + 1} {...config} />}
    </>
  )
}
