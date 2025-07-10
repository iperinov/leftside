import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Flex } from "@radix-ui/themes";
import type TreeConfig from "./TreeConfig";
import type { TreeItemProps } from "./TreeItem";
import TreeItem from "./TreeItem";
import type TreeItemData from "./TreeItemData";

export function SortableTreeItem<T extends TreeItemData<T>>({ item, level, parent, ...config }: TreeItemProps<T> & TreeConfig<T>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1};
  const itemFiltered = config.filter ? !item.name.toLowerCase().includes(config.filter?.filter.toLowerCase()) : false;

  return !itemFiltered && (
    <Flex direction="column" gap="2" ref={setNodeRef} style={style}>
      <TreeItem item={item} level={level} parent={parent} attributes={attributes} listeners={listeners} {...config} />
    </Flex>
  );
}
