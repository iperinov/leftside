import { useEffect, useState } from "react";
import type { MenuItem } from "~/components/dropdownContextMenu/DropdownContextMenu";
import Tree from "~/components/tree/Tree";
import type TreeConfig from "~/components/tree/TreeConfig";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import formatOrdinal from "~/utils/formatOrdinal";
import type CategoryTreeItem from "./CategoryTreeItem";

interface CategoryTreeProps {
  selectedUUID?: string;
  menuItems: MenuItem<CategoryTreeItem>[];
  onSelected?: (item: CategoryTreeItem) => void;
  onAdd?: (level: number, parentID: string) => void;
}

export default function CategoryTree({ selectedUUID, menuItems, onSelected, onAdd }: CategoryTreeProps) {
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);
  const findCategoryTrail = useCategoryTreeStore((state) => state.findCategotyTrail);
  const moveCategoryTo = useCategoryTreeStore((state) => state.moveCategoryTo);
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
      canItemHaveContextMenu: (item) => true,
      menuItems: menuItems,
    },
    additionalElements: {
      optionalsFor: () => [],
    },
    reorder: {
      allowed: (item, parent) => true,
      handler: (parent, childID, movedOnPlaceOfChildID) => moveCategoryTo(parent.id, childID, movedOnPlaceOfChildID),
    },
  } as TreeConfig<CategoryTreeItem>;

  return <Tree<CategoryTreeItem> root={rootCategory} level={0} {...config} />;
}
