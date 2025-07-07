import Tree from "~/components/tree/Tree";
import type CategoryTreeItem from "./CategoryTreeItem";
import { useEffect, useState } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type TreeConfig from "~/components/tree/TreeConfig";
import formatOrdinal from "~/common/formatOrdinal";
import type { MenuItem } from "~/components/dropdownContextMenu/DropdownContextMenu";

interface CategoryTreeProps {
  selectedID?: string;
  menuItems: MenuItem<CategoryTreeItem>[];
  onSelected?: (item: CategoryTreeItem) => void;
  onAdd?: (level: number, parentID: string) => void;
}

export default function CategoryTree({ selectedID, menuItems, onSelected, onAdd }: CategoryTreeProps) {
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);
  const findCategoryTrail = useCategoryTreeStore((state) => state.findCategotyTrail);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedID) return;
    const trail = findCategoryTrail(selectedID);
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
  }, [selectedID]);

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
      selectedID: selectedID,
      handler: onSelected,
    },
    contextMenu: {
      canItemHaveContextMenu: (item) => true,
      menuItems: menuItems,
    },
    additionalElements: {
      optionalsFor: (item) => {},
    },
    //reorder: {},
  } as TreeConfig<CategoryTreeItem>;

  return <Tree<CategoryTreeItem> root={rootCategory} level={0} {...config} />;
}
