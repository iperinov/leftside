import { useSortable } from "@dnd-kit/sortable";
import type TreeConfig from "./TreeConfig";
import type { TreeItemProps } from "./TreeItem";
import type TreeItemData from "./TreeItemData";
import { CSS } from "@dnd-kit/utilities";
import { Flex } from "@radix-ui/themes";
import TreeItem from "./TreeItem";

export function SortableTreeItem<T extends TreeItemData<T>>({ item, level, parent, ...config }: TreeItemProps<T> & TreeConfig<T>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Flex direction="column" gap="2" ref={setNodeRef} style={style}>
      <TreeItem item={item} level={level} parent={parent} attributes={attributes} listeners={listeners} {...config} />
    </Flex>
  );
}
