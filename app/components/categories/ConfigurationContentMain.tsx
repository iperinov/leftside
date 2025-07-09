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
import FilterGroupList from "./filterGroup/FilterGroupList";
import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";


interface ConfigurationContentMainProps {
  categoryUUID: string;
}

export default function ConfigurationContentMain({ categoryUUID, className }: ConfigurationContentMainProps & ClassNameProps) {
  const category = useCategoryTreeStore((state) => state.findCategory(categoryUUID));
  const addEmptyFilterGroup = useCategoryTreeStore((state) => state.addEmptyFilterGroup);
  const [duplicateItemData, setDuplicateItemData] = useState<{ categoryUUID: string; filterGroupUUID: string }>();
  const [deleteItemData, setDeleteItemData] = useState<{ categoryUUID: string; filterGroupUUID: string }>();
  const showAddNewFilterGroup = category?.type === "flat";

  const menuItems: MenuItem<{ categoryUUID: string; filterGroupUUID: string }>[] = [
    { name: "Duplicate", action: (context) => setDuplicateItemData(context) },
    { name: "Delete", action: (context) => setDeleteItemData(context) },
  ];

  return (
    <>
      <Flex gap="2" direction="column" p="2" flexGrow="1">
        {category && <FilterGroupList category={category} menuItems={menuItems} /> }
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
