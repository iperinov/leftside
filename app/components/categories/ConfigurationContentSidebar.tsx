import { useState } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ClassNameProps from "../shared/ClassNameProps";
import AddNewCategory from "./category/AddNewCategory";
import DeleteCategory from "./category/DeleteCategory";
import DuplicateCategory from "./category/DuplicateCategory";
import RenameCategory from "./category/RenameCategory";
import CategoryTree from "./tree/CategoryTree";
import type CategoryTreeItem from "./tree/CategoryTreeItem";
import ConfirmDialog from "../dialogs/ConfirmDialog.";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";

interface ConfigurationContentSidebarProps {
  selectedUUID: string;
  onSelected: (item: CategoryTreeItem) => void;
}

export default function ConfigurationContentSidebar({ selectedUUID, onSelected, className }: ConfigurationContentSidebarProps & ClassNameProps) {
  const [addItemData, setAddItemData] = useState<{ level: number; parentUUID: string }>();
  const [renameItemData, setRenameItemData] = useState<{ id: string; name: string }>();
  const [duplicateItemData, setDuplicateItemData] = useState<{ id: string; name: string; parentID: string }>();
  const [deleteItemData, setDeleteItemData] = useState<{ id: string }>();
  const [preselected, setPreselected] = useState<{ firstLevelParent: string; uuid: string }[]>([]);
  const [changePreselectionData, setChangePreselectionData] = useState<{
    currentItem: CategoryTreeItem;
    newItem: CategoryTreeItem;
    firstParent: CategoryTreeItem;
  }>();
  const [mainPreselected, setMainPreselected] = useState<number>();
  const findItemCategory = useCategoryTreeStore((state) => state.findCategory);
  const findParentCategory = useCategoryTreeStore((state) => state.findParentCategory);
  const findFirstLevelParent = useCategoryTreeStore((state) => state.findFirstLevelParent);
  const moveCategoryTo = useCategoryTreeStore((state) => state.moveCategoryTo);

  const onPreselected = (item: CategoryTreeItem) => {
    const itemFirstParent = findFirstLevelParent(item.id);
    if (!itemFirstParent) return;

    const existingPreselection = preselected.find(({ firstLevelParent, uuid }) => firstLevelParent === itemFirstParent.id);
    if (existingPreselection) {
      const currentPreselection = findItemCategory(existingPreselection.uuid);
      if (!currentPreselection) throw new Error(`Preselected item with UUID ${existingPreselection.uuid} not found.`);
      setChangePreselectionData({ currentItem: currentPreselection, newItem: item, firstParent: itemFirstParent });
      return;
    }

    setPreselected((prev) => [...prev, { firstLevelParent: itemFirstParent.id, uuid: item.id }]);
  };

  const changePreselection = () => {
    if (!changePreselectionData) throw new Error("Change preselection data is not set.");
    const { currentItem, newItem, firstParent } = changePreselectionData;

    setPreselected((prev) =>
      prev.map((item) => (item.firstLevelParent === firstParent.id ? { firstLevelParent: item.firstLevelParent, uuid: newItem.id } : item))
    );
    setChangePreselectionData(undefined);
  };

  const getOptionalNodesFor = (item: CategoryTreeItem) => {
    return preselected.find((preselectedItem) => preselectedItem.uuid === item.id)
      ? [{ key: "pre", node: <BookmarkFilledIcon color="var(--accent-9)" /> }]
      : [];
  };

  return (
    <>
      <aside className={className}>
        <CategoryTree
          selectedUUID={selectedUUID}
          preselected={preselected}
          onSelected={onSelected}
          onAdd={(level, parentUUID) => setAddItemData({ level, parentUUID })}
          onRename={setRenameItemData}
          onDelete={setDeleteItemData}
          onDuplicate={(item) => setDuplicateItemData({ ...item, parentID: findParentCategory(item.id)?.id || "" })}
          onPreselected={onPreselected}
          onReorder={(parent, childID, movedOnPlaceOfChildID) => moveCategoryTo(parent.id, childID, movedOnPlaceOfChildID)}
          getOptionalNodesForCategory={getOptionalNodesFor}
        />
      </aside>

      {/* Actions */}
      {addItemData && <AddNewCategory {...addItemData} onCompleted={() => setAddItemData(undefined)} onCanceled={() => setAddItemData(undefined)} />}
      {renameItemData && (
        <RenameCategory {...renameItemData} onCompleted={() => setRenameItemData(undefined)} onCanceled={() => setRenameItemData(undefined)} />
      )}
      {duplicateItemData && (
        <DuplicateCategory {...duplicateItemData} onCompleted={() => setDuplicateItemData(undefined)} onCanceled={() => setDuplicateItemData(undefined)} />
      )}
      {deleteItemData && (
        <DeleteCategory {...deleteItemData} onCompleted={() => setDeleteItemData(undefined)} onCanceled={() => setDeleteItemData(undefined)} />
      )}

      {changePreselectionData && (
        <ConfirmDialog
          title="Change preselection"
          description={`Change preselection for "${changePreselectionData.firstParent.name}" from "${changePreselectionData.currentItem.name}" to "${changePreselectionData.newItem.name}"?`}
          confirmText="Change"
          destructive={true}
          onCancel={() => setChangePreselectionData(undefined)}
          onConfirm={changePreselection}
        />
      )}
    </>
  );
}
