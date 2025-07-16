import { BookmarkFilledIcon, BookmarkIcon, StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import ConfirmDialog from "../dialogs/ConfirmDialog.";
import type ClassNameProps from "../shared/ClassNameProps";
import TwoStateIconWithHint from "../shared/TwoStateIconWithHintProps";
import AwesomeIcon, { getAwesomeIconClassForSport } from "./AwesomeIcon";
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
  const [preselected, setPreselected] = useState<{ firstLevelParent: string; uuid: string }[]>([]);
  const [changePreselectionData, setChangePreselectionData] = useState<{
    currentItem: CategoryTreeItem;
    newItem: CategoryTreeItem;
    firstParent: CategoryTreeItem;
  }>();
  const [mainPreselected, setMainPreselected] = useState<string>();
  const [mainPreselectedData, setMainPreselectedData] = useState<{ currentItem: CategoryTreeItem; newItem: CategoryTreeItem }>();
  const findItemCategory = useCategoryTreeStore((state) => state.findCategory);
  const findParentCategory = useCategoryTreeStore((state) => state.findParentCategory);
  const findFirstLevelParent = useCategoryTreeStore((state) => state.findFirstLevelParent);
  const moveCategoryTo = useCategoryTreeStore((state) => state.moveCategoryTo);

  const onMainPreselected = (item: CategoryTreeItem) => {
    if (mainPreselected) {
      const currentMainPreselection = findItemCategory(mainPreselected);
      if (!currentMainPreselection) throw new Error(`Preselected item with UUID ${mainPreselected} not found.`);
      setMainPreselectedData({ currentItem: currentMainPreselection, newItem: item });
      return;
    }

    setMainPreselected(item.id);
  };

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

    const isCurrentItemMainPreselected = mainPreselected === currentItem.id;
    setPreselected((prev) =>
      prev.map((item) => (item.firstLevelParent === firstParent.id ? { firstLevelParent: item.firstLevelParent, uuid: newItem.id } : item)),
    );
    if (isCurrentItemMainPreselected) {
      setMainPreselected(newItem.id);
    }
    setChangePreselectionData(undefined);
  };

  const preselectionIconsFor = (item: CategoryTreeItem, level: number) => {
    const isItemFlat = item.type === "flat";
    if (!isItemFlat) return [];
    const isItemPreselected = preselected.some((preselectedItem) => preselectedItem.uuid === item.id);
    const isItemMainPreselected = mainPreselected === item.id;

    const icons = [
      {
        key: "pre",
        node: (
          <TwoStateIconWithHint
            selected={isItemPreselected}
            hint="Automatically open a category when its top-level parent is selected by the user."
            SelectedIcon={BookmarkFilledIcon}
            NotSelectedIcon={BookmarkIcon}
            onSelected={() => onPreselected(item)}
          />
        ),
      },
    ];

    if (isItemPreselected) {
      icons.push({
        key: "main",
        node: (
          <TwoStateIconWithHint
            selected={isItemMainPreselected}
            hint="Mark this category as the default selection. It will automatically open when the user first visits the website."
            SelectedIcon={StarFilledIcon}
            NotSelectedIcon={StarIcon}
            onSelected={() => onMainPreselected(item)}
          />
        ),
      });
    }

    return icons;
  };

  const sportIconFor = (sportCategory: CategoryTreeItem, level: number) => {
    if (level !== 0 || sportCategory.type !== "nested") return [];
    return sportCategory.iconID ? [{ key: sportCategory.iconID, node: <AwesomeIcon sportUUID={sportCategory.iconID} size="1" /> }] : [];
  };

  const optionalNodes = (item: CategoryTreeItem, level: number) => [...preselectionIconsFor(item, level), ...sportIconFor(item, level)];

  return (
    <>
      <aside className={className}>
        <CategoryTree
          selectedUUID={selectedUUID}
          onSelected={onSelected}
          onAdd={(level, parentUUID) => setAddItemData({ level, parentUUID })}
          onRename={setRenameItemData}
          onDelete={setDeleteItemData}
          onDuplicate={(item) => setDuplicateItemData({ ...item, parentID: findParentCategory(item.id)?.id || "" })}
          onReorder={(parent, childID, movedOnPlaceOfChildID) => moveCategoryTo(parent.id, childID, movedOnPlaceOfChildID)}
          getOptionalNodes={optionalNodes}
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
          description={
            mainPreselected === changePreselectionData.currentItem.id
              ? `Change preselection for "${changePreselectionData.firstParent.name}" from "${changePreselectionData.currentItem.name}" to "${changePreselectionData.newItem.name}" and transfer main preselection?`
              : `Change preselection for "${changePreselectionData.firstParent.name}" from "${changePreselectionData.currentItem.name}" to "${changePreselectionData.newItem.name}"?`
          }
          confirmText="Change"
          destructive={true}
          onCancel={() => setChangePreselectionData(undefined)}
          onConfirm={changePreselection}
        />
      )}

      {mainPreselectedData && (
        <ConfirmDialog
          title="Change main preselection"
          description={`Change main preselection from "${mainPreselectedData.currentItem.name}" to "${mainPreselectedData.newItem.name}"?`}
          confirmText="Change"
          destructive={true}
          onCancel={() => setMainPreselectedData(undefined)}
          onConfirm={() => {
            setMainPreselected(mainPreselectedData.newItem.id);
            setMainPreselectedData(undefined);
          }}
        />
      )}
    </>
  );
}
