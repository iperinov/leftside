import Tree from "../tree/Tree";
import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";
import formatOrdinal from "~/common/formatOrdinal";
import { useState } from "react";
import type CategoryTreeItem from "./CategoryTreeItem";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ClassNameProps from "../shared/ClassNameProps";

interface ConfigurationSidebarProps {
  selectedID: string;
  onSelected: (item: CategoryTreeItem) => void;
  onAdd: (level: number, parentID: string) => void;
  onRename: (item: CategoryTreeItem) => void;
  onDuplicate: (item: CategoryTreeItem) => void;
  onDelete: (item: CategoryTreeItem) => void;
}

export default function ConfigurationSidebar({ selectedID, onSelected, onAdd, onRename, onDuplicate, onDelete, className }
: ConfigurationSidebarProps & ClassNameProps) 
{
  const treeRoot = useCategoryTreeStore((state) => state.rootCategory);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const menuItems: MenuItem<CategoryTreeItem>[] = [
    { name: "Rename", action: (context) => context && onRename(context) },
    { name: "Delete", action: (context) => context && onDelete(context) },
    { name: "Duplicate", action: (context) => context && onDuplicate(context) },
  ];

  return (
    <aside className={className}>
      <Tree<CategoryTreeItem>
        root={treeRoot}
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
          handler: (level, parent) => onAdd(level, parent.id),
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
  );
}
