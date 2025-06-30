import Tree from "../tree/Tree";
import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";
import formatOrdinal from "~/common/formatOrdinal";
import { useState } from "react";
import type CategoryTreeItem from "./CategoryTreeItem";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ClassNameProps from "../shared/ClassNameProps";
import { findItemParent } from "../tree/common/findItem";
import AddNewCategory from "./category/AddNewCategory";
import RenameCategory from "./category/RenameCategory";
import DeleteCategory from "./category/DeleteCategory";
import DuplicateCategory from "./category/DuplicateCategory";

interface ConfigurationContentSidebarProps {
  selectedID: string;
  onSelected: (item: CategoryTreeItem) => void;
}

export default function ConfigurationContentSidebar({ selectedID, onSelected, className }: ConfigurationContentSidebarProps & ClassNameProps) {
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [addItemData, setAddItemData] = useState<{ level: number; parentID: string }>();
  const [renameItemData, setRenameItemData] = useState<{ id: string; name: string }>();
  const [duplicateItemData, setDuplicateItemData] = useState<{ id: string; name: string; parentID: string }>();
  const [deleteItemData, setDeleteItemData] = useState<{ id: string }>();

  const menuItems: MenuItem<CategoryTreeItem>[] = [
    { name: "Rename", action: (context) => context && setRenameItemData({ id: context.id, name: context.name }) },
    { name: "Delete", action: (context) => context && setDeleteItemData({ id: context.id }) },
    {
      name: "Duplicate",
      action: (context) =>
        context && setDuplicateItemData({ id: context.id, name: context.name, parentID: findItemParent(context.id, rootCategory)?.id || "" }),
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
