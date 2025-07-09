import { Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ClassNameProps from "../shared/ClassNameProps";
import DeleteFilterGroup from "./filterGroup/DeleteFilterGroup";
import DuplicateFilterGroup from "./filterGroup/DuplicateFilterGroup";
import EmptyFilterGroupRow from "./filterGroup/EmptyFilterGroupRow";
import SortableFilterGroupRow from "./filterGroup/SortableFilterGroupRow";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";


interface ConfigurationContentMainProps {
  categoryUUID: string;
}

export default function ConfigurationContentMain({ categoryUUID, className }: ConfigurationContentMainProps & ClassNameProps) {
  const category = useCategoryTreeStore((state) => state.findCategory(categoryUUID));
  const moveToFilterGroup = useCategoryTreeStore((state) => state.moveFilterGroupTo);
  const addEmptyFilterGroup = useCategoryTreeStore((state) => state.addEmptyFilterGroup);
  const [duplicateItemData, setDuplicateItemData] = useState<{ categoryUUID: string; filterGroupUUID: string }>();
  const [deleteItemData, setDeleteItemData] = useState<{ categoryUUID: string; filterGroupUUID: string }>();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );
  const hasFilters = category?.filterGroups ? category.filterGroups.length > 0 : false;
  const showAddNewFilterGroup = category?.type === "flat";

  const handleDragOver = ({active, over}: DragEndEvent) => {
    console.log("Drag End Event", active, over);
    if (!over || active.id === over.id) return;
    moveToFilterGroup(categoryUUID, active.id as string, over.id as string);
  };

  return (
    <>
      <Flex gap="2" direction="column" p="2" flexGrow="1">
        {category?.filterGroups && hasFilters ? (
          <DndContext onDragEnd={handleDragOver} sensors={sensors} collisionDetection={closestCenter}>
            <SortableContext items={category.filterGroups.map((group) => group.uuid)} id={category.id} strategy={verticalListSortingStrategy}>
              {category.filterGroups.map((filterGroup) => (
                <SortableFilterGroupRow
                  key={filterGroup.uuid}
                  categoryUUID={category.id}
                  filterGroupUUID={filterGroup.uuid}
                  onDuplicate={(categoryUUID, filterGroupUUID) => setDuplicateItemData({categoryUUID, filterGroupUUID})}
                  onDelete={(categoryUUID, filterGroupUUID) => setDeleteItemData({categoryUUID, filterGroupUUID})}
                />
              ))}
            </SortableContext>
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
        {showAddNewFilterGroup && (
          <Flex align="center" justify="center">
            <Button onClick={() => addEmptyFilterGroup(categoryUUID)}>Add New Group</Button>
          </Flex>
        )}
      </Flex>

      {duplicateItemData && (
        <DuplicateFilterGroup
          {...duplicateItemData}
          onCompleted={() => setDuplicateItemData(undefined)}
          onCanceled={() => setDuplicateItemData(undefined)}
        />
      )}
      {deleteItemData && (
        <DeleteFilterGroup {...deleteItemData} onCompleted={() => setDeleteItemData(undefined)} onCanceled={() => setDeleteItemData(undefined)} />
      )}
    </>
  );
}
