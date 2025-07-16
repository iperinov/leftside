import { Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";
import type ClassNameProps from "../shared/ClassNameProps";
import DeleteFilterGroup from "./filterGroup/DeleteFilterGroup";
import DuplicateFilterGroup from "./filterGroup/DuplicateFilterGroup";
import EmptyFilterGroupRow from "./filterGroup/EmptyFilterGroupRow";
import FilterGroupList from "./filterGroup/FilterGroupList";

interface ConfigurationContentMainProps {
  categoryUUID: string;
}

export default function ConfigurationContentMain({ categoryUUID, className }: ConfigurationContentMainProps & ClassNameProps) {
  const category = useCategoryTreeStore((state) => state.findCategory(categoryUUID));
  const addEmptyFilterGroup = useCategoryTreeStore((state) => state.addEmptyFilterGroup);
  const [duplicateItemData, setDuplicateItemData] = useState<{ categoryUUID: string; filterGroupUUID: string }>();
  const [deleteItemData, setDeleteItemData] = useState<{ categoryUUID: string; filterGroupUUID: string }>();
  const isFlatCategory = category?.type === "flat";
  const hasFilters = isFlatCategory && category?.filterGroups ? category.filterGroups?.length > 0 : false;

  const menuItems: MenuItem<{ categoryUUID: string; filterGroupUUID: string }>[] = [
    { name: "Duplicate", action: (context) => setDuplicateItemData(context) },
    { name: "Delete", action: (context) => setDeleteItemData(context) },
  ];

  return (
    <>
      <Flex gap="2" direction="column" p="2" flexGrow="1" className={className}>
        {hasFilters && category ? (
          <FilterGroupList category={category} menuItems={menuItems} />
        ) : (
          <EmptyFilterGroupRow
            text={
              isFlatCategory
                ? "No filters in this group. Click 'Add Filter' to create a new filter. Select child navigation item to proceed."
                : "Select child navigation item to proceed."
            }
          />
        )}

        {isFlatCategory && (
          <Flex align="center" justify="center">
            <Button onClick={() => addEmptyFilterGroup(categoryUUID)}>Add New Group</Button>
          </Flex>
        )}
      </Flex>

      {duplicateItemData && (
        <DuplicateFilterGroup {...duplicateItemData} onCompleted={() => setDuplicateItemData(undefined)} onCanceled={() => setDuplicateItemData(undefined)} />
      )}
      {deleteItemData && (
        <DeleteFilterGroup {...deleteItemData} onCompleted={() => setDeleteItemData(undefined)} onCanceled={() => setDeleteItemData(undefined)} />
      )}
    </>
  );
}
