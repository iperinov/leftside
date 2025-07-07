import { useState } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import formatOrdinal from "~/utils/formatOrdinal";
import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";
import type ClassNameProps from "../shared/ClassNameProps";
import Tree from "../tree/Tree";
import type CategoryTreeItem from "./tree/CategoryTreeItem";
import AddNewCategory from "./category/AddNewCategory";
import DeleteCategory from "./category/DeleteCategory";
import DuplicateCategory from "./category/DuplicateCategory";
import RenameCategory from "./category/RenameCategory";
import CategoryTree from "./tree/CategoryTree";

interface ConfigurationContentSidebarProps {
  selectedID: string;
  onSelected: (item: CategoryTreeItem) => void;
}

export default function ConfigurationContentSidebar({ selectedID, onSelected, className }: ConfigurationContentSidebarProps & ClassNameProps) {
  const [addItemData, setAddItemData] = useState<{ level: number; parentID: string }>();
  const [renameItemData, setRenameItemData] = useState<{ id: string; name: string }>();
  const [duplicateItemData, setDuplicateItemData] = useState<{ id: string; name: string; parentID: string }>();
  const [deleteItemData, setDeleteItemData] = useState<{ id: string }>();
  //const [preselected, setPreselected] = useState<string[]>([]);
  //const [masterPreselected, setMasterPreselected] = useState<string>();
  const findParentCategory = useCategoryTreeStore((state) => state.findParentCategory);

  const menuItems: MenuItem<CategoryTreeItem>[] = [
    { name: "Rename", action: (context) => context && setRenameItemData({ id: context.id, name: context.name }) },
    { name: "Delete", action: (context) => context && setDeleteItemData({ id: context.id }) },
    {
      name: "Duplicate",
      action: (context) =>
        context && setDuplicateItemData({ id: context.id, name: context.name, parentID: findParentCategory(context.id)?.id || "" }),
    },
  ];

  return (
    <>
      <aside className={className}>
        <CategoryTree
          selectedID={selectedID}
          onSelected={onSelected}
          onAdd={(level, parentID) => setAddItemData({ level, parentID })}
          menuItems={menuItems}
        />
      </aside>

      {/* Actions */}
      {addItemData && <AddNewCategory {...addItemData} onCompleted={() => setAddItemData(undefined)} onCanceled={() => setAddItemData(undefined)} />}
      {renameItemData && (
        <RenameCategory {...renameItemData} onCompleted={() => setRenameItemData(undefined)} onCanceled={() => setRenameItemData(undefined)} />
      )}
      {duplicateItemData && (
        <DuplicateCategory
          {...duplicateItemData}
          onCompleted={() => setDuplicateItemData(undefined)}
          onCanceled={() => setDuplicateItemData(undefined)}
        />
      )}
      {deleteItemData && (
        <DeleteCategory {...deleteItemData} onCompleted={() => setDeleteItemData(undefined)} onCanceled={() => setDeleteItemData(undefined)} />
      )}
    </>
  );
}
