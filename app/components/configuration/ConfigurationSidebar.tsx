import LoadDataDecorator from "../loading/LoadDataDecorator";
import Tree from "../tree/Tree";
import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";
import formatOrdinal from "~/common/formatOrdinal";
import { useState } from "react";
import type { FilterItem } from "./FilterItem";
import { useConfigurationCategories } from "~/hooks/configurationCategories/useConfigurationCategories";
import type { Category } from "~/api/scs/configurations/config.types";

interface ConfigurationSidebarProps {
    configUUID?: string;
    selectedUUID: string;
    onSelected: (item: FilterItem) => void;
    onAdd: (level: number, parentID: string) => void;
    onRename: (item: FilterItem) => void;
    onDuplicate: (item: FilterItem) => void;
    onDelete: (item: FilterItem) => void;
}

export default function ConfigurationSidebar({ configUUID, selectedUUID, onSelected, onAdd, onRename, onDuplicate, onDelete}: ConfigurationSidebarProps) {
  const {data: categories, isLoading, error} = configUUID ? useConfigurationCategories(configUUID) : { data: [], isLoading: false, error: null };
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const menuItems: MenuItem<FilterItem>[] = [
    { name: "Rename", action: (context) => context && onRename(context) },
    { name: "Delete", action: (context) => context && onDelete(context) },
    { name: "Duplicate", action: (context) => context && onDuplicate(context) },
  ];

  return (
    <LoadDataDecorator error={error} isLoading={isLoading}>
      <Tree<Category>
        root={{ uuid: "root-uuid", name:"",  children: categories} as Category}
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
          handler: (item, expand) => setExpandedItems((prev) => (expand ? [...prev, item.uuid] : prev.filter((uuid) => uuid !== item.uuid))),
        }}
        addToParent={{
          allowed: (level, parentID) => true,
          handler: (level, parent) => onAdd(level, parent.uuid),
          toString: (level, parentID) => `Add ${formatOrdinal(level + 1)} level`,
        }}
        selection={{
          allowed: (item) => !item.pending && !item.children,
          selectedID: selectedUUID,
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
