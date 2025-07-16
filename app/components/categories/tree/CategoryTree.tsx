import { useEffect, useState } from "react";
import type { MenuItem } from "~/components/dropdownContextMenu/DropdownContextMenu";
import Tree from "~/components/tree/Tree";
import type TreeConfig from "~/components/tree/TreeConfig";
import type { OptionalNode } from "~/components/tree/TreeConfig";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import formatOrdinal from "~/utils/formatOrdinal";
import type CategoryTreeItem from "./CategoryTreeItem";

interface CategoryTreeProps {
  selectedUUID?: string;
  onSelected?: (item: CategoryTreeItem) => void;
  onAdd?: (level: number, parentID: string) => void;
  onRename?: (item: { id: string; name: string }) => void;
  onDelete?: (item: { id: string }) => void;
  onDuplicate?: (item: { id: string; name: string }) => void;
  onReorder?: (parent: CategoryTreeItem, childID: string, movedOnPlaceOfChildID: string) => void;
  getOptionalNodes?: (item: CategoryTreeItem, level: number) => OptionalNode[];
}

export default function CategoryTree({ selectedUUID, onSelected, onAdd, onRename, onDelete, onDuplicate, onReorder, getOptionalNodes }: CategoryTreeProps) {
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);
  const findCategoryTrail = useCategoryTreeStore((state) => state.findCategotyTrail);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedUUID) return;
    const trail = findCategoryTrail(selectedUUID);
    if (!trail) return;

    setExpandedItems((prev) => {
      const newExpanded = [...prev];
      for (const item of trail) {
        if (!newExpanded.includes(item.id)) {
          newExpanded.push(item.id);
        }
      }
      return newExpanded;
    });
  }, [selectedUUID, findCategoryTrail]);

  const menuItems: MenuItem<CategoryTreeItem>[] = [
    { name: "Rename", action: (context) => context && onRename?.({ id: context.id, name: context.name }) },
    { name: "Delete", action: (context) => context && onDelete?.({ id: context.id }) },
    { name: "Duplicate", action: (context) => context && onDuplicate?.({ id: context.id, name: context.name }) },
  ];

  const config = {
    addToParent: {
      allowed: (level, parentID) => true,
      handler: (level, parent) => onAdd?.(level, parent.id),
      toString: (level, parentID) => `Add ${formatOrdinal(level + 1)} level`,
    },
    expand: {
      allowed: (item, level) => !!item.children,
      itemIDs: expandedItems,
      handler: (item, expand) => setExpandedItems((prev) => (expand ? [...prev, item.id] : prev.filter((id) => id !== item.id))),
    },
    selection: {
      allowed: (item) => !item.pending && !item.children,
      selectedID: selectedUUID,
      handler: onSelected,
    },
    contextMenu: {
      itemsFor: () => menuItems,
    },
    additionalElements: {
      getFor: getOptionalNodes,
    },
    reorder: {
      enabled: true,
      allowed: (item, parent) => true,
      handler: onReorder,
    },
    focusAttention: {
      allow: (item) => item.focusAttention || false,
      done: (item) => {
        item.focusAttention = false;
      },
    },
  } as TreeConfig<CategoryTreeItem>;

  return <Tree<CategoryTreeItem> root={rootCategory} level={0} {...config} />;
}
