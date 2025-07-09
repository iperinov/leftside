import { closestCenter, DndContext, DragOverlay, type DragEndEvent, type DragStartEvent, type UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Flex } from "@radix-ui/themes";
import SortableFilterGroupRow from "./SortableFilterGroupRow";
import type CategoryTreeItem from "../tree/CategoryTreeItem";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { useState } from "react";
import EmptyFilterGroupRow from "./EmptyFilterGroupRow";
import type { MenuItem } from "~/components/dropdownContextMenu/DropdownContextMenu";
import FiltersGroupRow from "./FilterGroupRow";

interface FilterGroupListProps {
  category: CategoryTreeItem;
  menuItems?: MenuItem<{ categoryUUID: string; filterGroupUUID: string }>[];
}

export default function FilterGroupList({ category, menuItems }: FilterGroupListProps) {
  const moveToFilterGroup = useCategoryTreeStore((state) => state.moveFilterGroupTo);
  const [activeID, setActiveID] = useState<UniqueIdentifier>();
  const activeFilterGroup = category.filterGroups?.find((group) => group.uuid === activeID);
  const hasFilters = category.filterGroups ? category.filterGroups?.length > 0 : false;

  const handleDragOver = ({ active, over }: DragEndEvent) => {
    setActiveID(undefined);
    if (!over || active.id === over.id) return;
    moveToFilterGroup(category.id, active.id as string, over.id as string);
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveID(active.id);
  };

  const handleDragCancel = () => {
    setActiveID(undefined);
  };

  return (
    <Flex gap="2" direction="column">
      {category.filterGroups && hasFilters ? (
        <DndContext onDragEnd={handleDragOver} onDragStart={handleDragStart} onDragCancel={handleDragCancel} collisionDetection={closestCenter}>
          <SortableContext items={category.filterGroups.map((group) => group.uuid)} id={category.id} strategy={verticalListSortingStrategy}>
            {category.filterGroups.map((filterGroup) => (
              <SortableFilterGroupRow key={filterGroup.uuid} categoryUUID={category.id} filterGroupUUID={filterGroup.uuid} menuItems={menuItems} />
            ))}
          </SortableContext>

          <DragOverlay
            adjustScale={false}
            dropAnimation={{
              duration: 150,
              easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
            }}
          >
            {activeFilterGroup && <FiltersGroupRow categoryUUID={category.id} filterGroupUUID={activeFilterGroup.uuid} menuItems={menuItems} dragging/>}
          </DragOverlay>
        </DndContext>
      ) : (
        <EmptyFilterGroupRow
          text={
            category?.type === "flat"
              ? "No filters in this group. Click 'Add Filter' to create a new filter. Select child navigation item to proceed."
              : "Select child navigation item to proceed."
          }
        />
      )}
    </Flex>
  );
}
