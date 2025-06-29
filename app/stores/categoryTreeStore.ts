import { create, createStore, useStore } from "zustand";
import type { FilterGroup } from "~/api/scs/configurations/config.types";
import type CategoryTreeItem from "~/components/categories/CategoryTreeItem";
import { findItem, findItemParent, findItemSiblings } from "~/components/tree/common/findItem";
import iterateItem from "~/components/tree/common/iterateItem";

interface CategoryTreeState {
  rootCategory: CategoryTreeItem;
}

interface CategoryTreeGetters {
  getFilterGroup: (categoryID: string, filterID: string) => FilterGroup | undefined;
  findCategory: (id: string) => CategoryTreeItem | undefined;
  findParentCategory: (id: string) => CategoryTreeItem | undefined;
  findCategorySiblings: (id: string) => CategoryTreeItem[] | undefined;
  filters: (categoryID: string, filterID: string, type: string) => string[];
  sportFilters: (categoryID: string, filterID: string) => string[];
  leagueFilters: (categoryID: string, filterID: string) => string[];
}

interface CategoryTreeMutations {
  reset: (categories: CategoryTreeItem[]) => void;
  addCategory: (parentID: string, newItem: CategoryTreeItem) => boolean;
  renameCategory: (id: string, newName: string) => boolean;
  deleteCategory: (id: string) => boolean;
  duplicateCategory: (id: string, name: string, parentID: string) => boolean;

  updateSportsFilter: (categoryID: string, filterID: string, selected: string[]) => void;
  updateLeaguesFilter: (categoryID: string, filterID: string, selected: string[]) => void;
}

const rootCategoryID = "root-categories-id";

function newItemID(): string {
  return crypto.randomUUID();
}

export const useCategoryTreeStore = create<CategoryTreeState & CategoryTreeGetters & CategoryTreeMutations>((set, get) => ({
  // State
  rootCategory: { id: rootCategoryID, name: "", type: "nested", children: [] },

  // Getters
  findCategory: (id: string) => findItem(id, get().rootCategory),
  findParentCategory: (id: string) => findItemParent(id, get().rootCategory),
  findCategorySiblings: (id: string) => get().findParentCategory(id)?.children,
  getFilterGroup: (categoryID: string, filterID: string) =>
    get().findCategory(categoryID)?.filterGroups?.find((group) => group.uuid === filterID),
  filters: (categoryID: string, filterID: string, type: string) =>
    get().getFilterGroup(categoryID, filterID)?.filters.find((filter) => filter.type === type)?.values || [],
  sportFilters: (categoryID: string, filterID: string) => get().filters(categoryID, filterID, "sport"),
  leagueFilters: (categoryID: string, filterID: string) => get().filters(categoryID, filterID, "league"),

  // Mutations
  reset: (categories) => {
    set((state) => ({ rootCategory: { ...state.rootCategory, children: categories } }));
  },

  addCategory: (parentID, newItem) => {
    const rootCategory = structuredClone(get().rootCategory);
    if (parentID === rootCategoryID) {
      rootCategory.children = [...(rootCategory.children || []), newItem];
    } else if (rootCategory.children) {
      let parent = findItem(parentID, rootCategory);
      if (!parent) return false;
      parent.children = [...(parent.children || []), newItem];
    }
    set({ rootCategory: rootCategory });
    return true;
  },

  renameCategory: (id, newName) => {
    let rootCategory = structuredClone(get().rootCategory);
    if (!rootCategory.children) return false;
    const item = findItem(id, rootCategory);
    if (!item) return false;
    item.name = newName;
    set({ rootCategory: rootCategory });
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
    set({ rootCategory: rootCategory });
    return true;
  },

  duplicateCategory: (id, name, parentID) => {
    const rootCategory = structuredClone(get().rootCategory);
    const parent = findItem(parentID, rootCategory);
    if (!parent) return false;
    const item = findItem(id, parent);
    if (!item) return false;
    const newItem = { ...structuredClone(item), name };
    iterateItem(newItem, (item) => {
      item.id = newItemID();
    });
    if (parent.children) {
      parent.children.push(newItem);
    } else {
      parent.children = [newItem];
    }
    set({ rootCategory: rootCategory });
    return true;
  },

  updateSportsFilter: (categoryID: string, filterID: string, selected: string[], selectedLeagues?: string[]) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryID, rootCategory);
    if (!category) return;
    const filterGroup = category.filterGroups?.find((group) => group.uuid === filterID);
    if (!filterGroup) return;

    const sportFilter = filterGroup.filters.find((filter) => filter.type === "sport");
    if (!sportFilter) return;
      
    sportFilter.values = selected;

    if (selectedLeagues && selectedLeagues.length > 0) {
      const leaguesFilter = filterGroup.filters.find((filter) => filter.type === "league");
      if (leaguesFilter) {
        leaguesFilter.values = selectedLeagues;
      }
    }
    set({ rootCategory: rootCategory });
  },

  updateLeaguesFilter: (categoryID: string, filterID: string, selected: string[]) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryID, rootCategory);
    if (!category) return;
    const filterGroup = category.filterGroups?.find((group) => group.uuid === filterID);
    if (!filterGroup) return;

    const leaguesFilter = filterGroup.filters.find((filter) => filter.type === "league");
    if (!leaguesFilter) return;
    
    leaguesFilter.values = selected;
    set({ rootCategory: rootCategory });
  },
}));

// export const useCategoryTreeStore = (selector: (state: CategoryTreeState & CategoryTreeGetters & CategoryTreeMutations) => any) =>
  // useStore(categoryTreeStore, selector);