import { useState } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ClassNameProps from "../shared/ClassNameProps";
import AddNewCategory from "./category/AddNewCategory";
import DeleteCategory from "./category/DeleteCategory";
import DuplicateCategory from "./category/DuplicateCategory";
import RenameCategory from "./category/RenameCategory";
import CategoryTree from "./tree/CategoryTree";
import type CategoryTreeItem from "./tree/CategoryTreeItem";

interface ConfigurationContentSidebarProps {
  selectedUUID: string;
  onSelected: (item: CategoryTreeItem) => void;
}

export default function ConfigurationContentSidebar({ selectedUUID, onSelected, className }: ConfigurationContentSidebarProps & ClassNameProps) {
  const [addItemData, setAddItemData] = useState<{ level: number; parentUUID: string }>();
  const [renameItemData, setRenameItemData] = useState<{ id: string; name: string }>();
  const [duplicateItemData, setDuplicateItemData] = useState<{ id: string; name: string; parentID: string }>();
  const [deleteItemData, setDeleteItemData] = useState<{ id: string }>();
  const [preselected, setPreselected] = useState<string[]>([]);
  const [masterPreselected, setMasterPreselected] = useState<string>();
  const findParentCategory = useCategoryTreeStore((state) => state.findParentCategory);
  const moveCategoryTo = useCategoryTreeStore((state) => state.moveCategoryTo);

  return (
    <>
      <aside className={className}>
        <CategoryTree
          selectedUUID={selectedUUID}
          onSelected={onSelected}
          onAdd={(level, parentUUID) => setAddItemData({ level, parentUUID })}
          onRename={setRenameItemData}
          onDelete={setDeleteItemData}
          onDuplicate={(item) => setDuplicateItemData({...item, parentID: findParentCategory(item.id)?.id || ""}) }
          onReorder={(parent, childID, movedOnPlaceOfChildID) => moveCategoryTo(parent.id, childID, movedOnPlaceOfChildID)}
          getOptionalNodesForCategory={(item) => []}
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
