import { useState } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import formatOrdinal from "~/utils/formatOrdinal";
import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";
import type ClassNameProps from "../shared/ClassNameProps";
import Tree from "../tree/Tree";
import type CategoryTreeItem from "./CategoryTreeItem";
import AddNewCategory from "./category/AddNewCategory";
import DeleteCategory from "./category/DeleteCategory";
import DuplicateCategory from "./category/DuplicateCategory";
import RenameCategory from "./category/RenameCategory";

interface ConfigurationContentSidebarProps {
  selectedID: string;
  onSelected: (item: CategoryTreeItem) => void;
}

export default function ConfigurationContentSidebar({ selectedID, onSelected, className }: ConfigurationContentSidebarProps & ClassNameProps) {
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [addItemData, setAddItemData] = useState<{
    level: number;
    parentID: string;
  }>();
  const [renameItemData, setRenameItemData] = useState<{
    id: string;
    name: string;
  }>();
  const [duplicateItemData, setDuplicateItemData] = useState<{
    id: string;
    name: string;
    parentID: string;
  }>();
  const [deleteItemData, setDeleteItemData] = useState<{ id: string }>();
  const findParentCategory = useCategoryTreeStore((state) => state.findParentCategory);

  const menuItems: MenuItem<CategoryTreeItem>[] = [
    {
      name: "Rename",
      action: (context) => context && setRenameItemData({ id: context.id, name: context.name }),
    },
    {
      name: "Delete",
      action: (context) => context && setDeleteItemData({ id: context.id }),
    },
    {
      name: "Duplicate",
      action: (context) =>
        context &&
        setDuplicateItemData({
          id: context.id,
          name: context.name,
          parentID: findParentCategory(context.id)?.id || "",
        }),
    },
  ];

  return (
    <>
      <aside className={className}>
        <Tree<CategoryTreeItem>
          root={rootCategory}
          level={0}
          reorder={{
            allowed: (item, parent) => true,
            handler: (item, oldParent, newParent) => {
              // TODO: Implement reorder logic here
            },
          }}
          expand={{
            allowed: (item, level) => !!item.children,
            itemIDs: expandedItems,
            handler: (item, expand) => setExpandedItems((prev) => (expand ? [...prev, item.id] : prev.filter((id) => id !== item.id))),
          }}
          addToParent={{
            allowed: (level, parentID) => true,
            handler: (level, parent) => setAddItemData({ level, parentID: parent.id }),
            toString: (level, parentID) => `Add ${formatOrdinal(level + 1)} level`,
          }}
          selection={{
            allowed: (item) => !item.pending && !item.children,
            selectedID: selectedID,
            handler: onSelected,
          }}
          contextMenu={{
            canItemHaveContextMenu: (item) => true,
            menuItems: menuItems,
          }}
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
    </>
  );
}
