import { Flex } from "@radix-ui/themes";
import AddTreeItemButton from "./AddTreeItemButton";
import type TreeConfig from "./TreeConfig";
import type TreeItemData from "./TreeItemData";
import { closestCenter, DndContext, DragOverlay, type DragEndEvent, type DragStartEvent, type UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableTreeItem } from "./SortableTreeItem";
import { useState } from "react";
import TreeItem from "./TreeItem";
import { restrictToFirstScrollableAncestor, restrictToVerticalAxis } from "@dnd-kit/modifiers";

interface TreeProps<T extends TreeItemData<T>> {
  root: T;
  level: number;
}

export default function Tree<T extends TreeItemData<T>>({ root, level, ...config }: TreeProps<T> & TreeConfig<T>) {
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

  return (
    <Flex direction={"column"} gap="2" ml={level === 0 ? undefined : "5"}>
      {/* Render items in section */}
      {root.children && root.children.length > 0 && (
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
                <TreeItem item={activeItem} level={level} parent={root} dragging {...config}/>
              </Flex>
            )}
          </DragOverlay>
        </DndContext>
      )}

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
