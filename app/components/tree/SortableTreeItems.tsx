import { closestCenter, DndContext, DragOverlay, type DragEndEvent, type DragStartEvent, type UniqueIdentifier } from "@dnd-kit/core";
import { restrictToFirstScrollableAncestor, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type TreeItemData from "./TreeItemData";
import { useState } from "react";
import type TreeConfig from "./TreeConfig";
import TreeItem from "./TreeItem";
import { Flex } from "@radix-ui/themes";
import { SortableTreeItem } from "./SortableTreeItem";

interface SortableTreeItemsProps<T extends TreeItemData<T>> {
  root: T;
  level: number;
}

export default function SortableTreeItems<T extends TreeItemData<T>>({root, level, ...config}: SortableTreeItemsProps<T> & TreeConfig<T>) {
  const [activeID, setActiveID] = useState<UniqueIdentifier>();
  const activeItem = root.children?.find((child) => child.id === activeID);

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    setActiveID(undefined);
    if (!over || active.id === over.id) return;
    config.reorder?.handler(root, active.id as string, over.id as string);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveID(event.active.id as string);
  };

  return ( root.children && root.children.length > 0 && (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={() => setActiveID(undefined)}
      modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
    >
      <SortableContext items={root.children.map((child) => child.id)} id={root.id} strategy={verticalListSortingStrategy}>
        {root.children.map((child) => (
          <SortableTreeItem key={child.id} item={child} level={level} parent={root} {...config} />
        ))}
      </SortableContext>

      <DragOverlay
        adjustScale={false}
        dropAnimation={{
          duration: 150,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
        }}
      >
        {activeItem && (
          <Flex direction="column" gap="2">
            <TreeItem item={activeItem} level={level} parent={root} dragging={true} {...config} />
          </Flex>
        )}
      </DragOverlay>
    </DndContext>
  ));
}
