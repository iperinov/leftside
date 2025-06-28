import { create } from "zustand";
import type { Category } from "~/api/scs/configurations/config.types";
import type CategoryTreeItem from "~/components/configuration/CategoryTreeItem";
import { findItem, findItemSiblings } from "~/components/tree/common/findItem";
import iterateItem from "~/components/tree/common/iterateItem";

interface CategoryTreeState {
  rootCategory: CategoryTreeItem;
}

interface CategoryTreeActions {
  rootCategories: () => CategoryTreeItem[];
  reset: (categories: CategoryTreeItem[]) => void;
  addCategory: (parentID: string, newItem: CategoryTreeItem) => boolean;
  renameCategory: (id: string, newName: string) => boolean;
  deleteCategory: (id: string) => boolean;
  duplicateCategory: (id: string, name: string, parentID: string) => boolean;
}

const rootCategoryID = "root-categories-id";

function newItemID(): string {
  return crypto.randomUUID(); 
}

export const useCategoryTreeStore = create<CategoryTreeState & CategoryTreeActions>((set, get) => ({
  rootCategory: { id: rootCategoryID, name: "", type: "nested", children: [] },
  rootCategories: () => get().rootCategory.children || [],
  reset: (categories) => { set((state) => ({rootCategory: {...state.rootCategory, children: categories}}))},
  addCategory: (parentID, newItem) => {
    const rootCategory = structuredClone(get().rootCategory);
    if (parentID === rootCategoryID) {
      rootCategory.children = [...(rootCategory.children || []), newItem];
    } else if (rootCategory.children) {
      let parent = findItem(parentID, rootCategory);
      if (!parent) return false;
      parent.children = [...(parent.children || []), newItem];
    }
    set({rootCategory: rootCategory});
    return true;
  },

  renameCategory: (id, newName) => {
    let rootCategory = structuredClone(get().rootCategory);
    if (!rootCategory.children) return false;
    const item = findItem(id, rootCategory);
    if (!item) return false;
    item.name = newName;
    set({rootCategory: rootCategory});
    return true;
  },

  deleteCategory: (id) => {
    let rootCategory = structuredClone(get().rootCategory);
    if (!rootCategory.children) return false;
    const siblings = findItemSiblings(id, rootCategory);
    if (!siblings) return false;
    const itemIndex = siblings.findIndex((item) => item.id === id);
    if (itemIndex === -1) return false;
    siblings.splice(itemIndex, 1);
    set({rootCategory: rootCategory});
    return true;
  },

  duplicateCategory: (id, name, parentID) => {
    const rootCategory = structuredClone(get().rootCategory);
    const parent = findItem(parentID, rootCategory);
    if (!parent) return false;
    const item = findItem(id, parent);
    if (!item) return false;
    const newItem = { ...structuredClone(item), name };
    iterateItem(newItem, (item) => {item.id = newItemID(); });
    if (parent.children) {
      parent.children.push(newItem);
    } else {
      parent.children = [newItem];
    }
    set({rootCategory: rootCategory});
    return true;
  },
}));
