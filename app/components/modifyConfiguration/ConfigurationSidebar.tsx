import useSports from "~/hooks/useSports";
import LoadDataDecorator from "../loading/LoadDataDecorator";
import Tree from "../tree/Tree";
import makeRoot from "../tree/common/makeRoot";
import type { FilterItem } from "~/api/configs/sportFiltersApi";
import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";
import formatOrdinal from "~/common/formatOrdinal";
import { useState } from "react";

interface ConfigurationSidebarProps {
    selectedID: string;
    onSelected: (item: FilterItem) => void;
    onAdd: (level: number, parentID: string) => void;
    onRename: (item: FilterItem) => void;
    onDuplicate: (item: FilterItem) => void;
    onDelete: (item: FilterItem) => void;
}

export default function ConfigurationSidebar({ selectedID, onSelected, onAdd, onRename, onDuplicate, onDelete}: ConfigurationSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { isLoading, error, filters } = useSports();

  const menuItems: MenuItem<FilterItem>[] = [
    { name: "Rename", action: (context) => context && onRename(context) },
    { name: "Delete", action: (context) => context && onDelete(context) },
    { name: "Duplicate", action: (context) => context && onDuplicate(context) },
  ];

  return (
    <LoadDataDecorator error={error} isLoading={isLoading}>
      <Tree
        root={makeRoot(filters)}
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
    </LoadDataDecorator>
  );
}
