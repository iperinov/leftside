import { v4 as uuidv4 } from "uuid";
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
  marketFilters: (categoryID: string, filterID: string) => string[];
  statusFilter: (categoryID: string, filterID: string) => string;
  timeFilter: (categoryID: string, filterID: string) => string;
  sortByFilter: (categoryID: string, filterID: string) => "asc" | "desc" | undefined;
  limitFilter: (categoryID: string, filterID: string) => number | undefined;
  groupByFilter: (categoryID: string, filterID: string) => string | undefined;
}

interface CategoryTreeMutations {
  reset: (categories: CategoryTreeItem[]) => void;
  addCategory: (parentID: string, newItem: CategoryTreeItem) => boolean;
  renameCategory: (id: string, newName: string) => boolean;
  deleteCategory: (id: string) => boolean;
  duplicateCategory: (id: string, name: string, parentID: string) => boolean;

  addEmptyFilterGroup: (categoryID: string) => boolean;
  deleteFilterGroup: (categoryID: string, groupID: string) => boolean;
  duplicateFilterGroup: (categoryID: string, groupID: string) => boolean;

  updateSportsFilter: (categoryID: string, filterID: string, selected: string[]) => void;
  updateLeaguesFilter: (categoryID: string, filterID: string, selected: string[]) => void;
  updateMarketsFilter: (categoryID: string, filterID: string, selected: string[]) => void;
  updateStatusFilter: (categoryID: string, filterID: string, selected: string) => void;
  updateTimeFilter: (categoryID: string, filterID: string, selected: string) => void;
  updateSortByFilter: (categoryID: string, filterID: string, selected: "asc" | "desc") => void;
  updateLimitFilter: (categoryID: string, filterID: string, selected: number | undefined) => void;
  updateGroupByFilter: (categoryID: string, filterID: string, selected: string) => void;

  updateFilters: (
    categoryID: string,
    filterID: string,
    type: "sport" | "region" | "league" | "game" | "period" | "market" | "time" | "status",
    selected: string[],
  ) => void;
}

const rootCategoryID = "root-categories-id";

function newItemID(): string {
  return uuidv4();
}

export const useCategoryTreeStore = create<CategoryTreeState & CategoryTreeGetters & CategoryTreeMutations>((set, get) => ({
  // State
  rootCategory: { id: rootCategoryID, name: "", type: "nested", children: [] },

  // Getters
  findCategory: (id: string) => findItem(id, get().rootCategory),
  findParentCategory: (id: string) => findItemParent(id, get().rootCategory),
  findCategorySiblings: (id: string) => get().findParentCategory(id)?.children,
  getFilterGroup: (categoryID: string, filterID: string) =>
    get()
      .findCategory(categoryID)
      ?.filterGroups?.find((group) => group.uuid === filterID),
  filters: (categoryID: string, filterID: string, type: string) =>
    get()
      .getFilterGroup(categoryID, filterID)
      ?.filters.find((filter) => filter.type === type)?.values || [],
  sportFilters: (categoryID: string, filterID: string) => get().filters(categoryID, filterID, "sport"),
  leagueFilters: (categoryID: string, filterID: string) => get().filters(categoryID, filterID, "league"),
  marketFilters: (categoryID: string, filterID: string) => get().filters(categoryID, filterID, "market"),
  statusFilter: (categoryID: string, filterID: string) => get().filters(categoryID, filterID, "status")[0],
  timeFilter: (categoryID: string, filterID: string) => get().filters(categoryID, filterID, "time")[0],
  sortByFilter: (categoryID: string, filterID: string) => get().getFilterGroup(categoryID, filterID)?.order,
  limitFilter: (categoryID: string, filterID: string) => get().getFilterGroup(categoryID, filterID)?.limit,
  groupByFilter: (categoryID: string, filterID: string) => get().getFilterGroup(categoryID, filterID)?.groupBy,

  // Mutations
  reset: (categories) => {
    set((state) => ({
      rootCategory: { ...state.rootCategory, children: categories },
    }));
  },

  addCategory: (parentID, newItem) => {
    const rootCategory = structuredClone(get().rootCategory);
    if (parentID === rootCategoryID) {
      rootCategory.children = [...(rootCategory.children || []), newItem];
    } else if (rootCategory.children) {
      const parent = findItem(parentID, rootCategory);
      if (!parent) return false;
      parent.children = [...(parent.children || []), newItem];
    }
    set({ rootCategory: rootCategory });
    return true;
  },

  renameCategory: (id, newName) => {
    const rootCategory = structuredClone(get().rootCategory);
    if (!rootCategory.children) return false;
    const item = findItem(id, rootCategory);
    if (!item) return false;
    item.name = newName;
    set({ rootCategory: rootCategory });
    return true;
  },

  deleteCategory: (id) => {
    const rootCategory = structuredClone(get().rootCategory);
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

  addEmptyFilterGroup: (categoryID: string) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryID, rootCategory);
    if (!category) return false;
    const emptyFilterGroup = {
      uuid: uuidv4(),
      filters: [],
    } as FilterGroup;
    if (category.filterGroups) {
      category.filterGroups.push(emptyFilterGroup);
    } else {
      category.filterGroups = [emptyFilterGroup];
    }
    set({ rootCategory: rootCategory });
    return true;
  },

  deleteFilterGroup: (categoryID: string, groupID: string) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryID, rootCategory);
    if (!category) return false;
    category.filterGroups = category.filterGroups?.filter((item) => item.uuid !== groupID);
    set({ rootCategory: rootCategory });
    return true;
  },

  duplicateFilterGroup: (categoryID: string, groupID: string) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryID, rootCategory);
    if (!category) return false;
    const filterGroup = category.filterGroups?.find((item) => item.uuid === groupID);
    if (!filterGroup) return false;
    const newFilterGroup = {
      ...structuredClone(filterGroup),
      uuid: uuidv4(),
    };
    category.filterGroups?.push(newFilterGroup);
    set({ rootCategory: rootCategory });
    return true;
  },

  updateFilters: (
    categoryID: string,
    filterID: string,
    type: "sport" | "region" | "league" | "game" | "period" | "market" | "time" | "status",
    selected: string[],
  ) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryID, rootCategory);
    if (!category) return;
    const filterGroup = category.filterGroups?.find((group) => group.uuid === filterID);
    if (!filterGroup) return;

    const existingFilter = filterGroup.filters.find((filter) => filter.type === type);
    if (existingFilter) {
      existingFilter.values = selected;
    } else {
      filterGroup.filters.push({ type: type, values: selected });
    }
    set({ rootCategory: rootCategory });
  },

  updateSportsFilter: (categoryID: string, filterID: string, selected: string[]) => {
    get().updateFilters(categoryID, filterID, "sport", selected);
  },

  updateLeaguesFilter: (categoryID: string, filterID: string, selected: string[]) => {
    get().updateFilters(categoryID, filterID, "league", selected);
  },

  updateMarketsFilter: (categoryID: string, filterID: string, selected: string[]) => {
    get().updateFilters(categoryID, filterID, "market", selected);
  },

  updateStatusFilter: (categoryID: string, filterID: string, selected: string) => {
    get().updateFilters(categoryID, filterID, "status", [selected]);
  },

  updateTimeFilter: (categoryID: string, filterID: string, selected: string) => {
    get().updateFilters(categoryID, filterID, "time", [selected]);
  },

  updateSortByFilter: (categoryID: string, filterID: string, selected: "asc" | "desc") => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryID, rootCategory);
    if (!category) return;
    const filterGroup = category.filterGroups?.find((group) => group.uuid === filterID);
    if (!filterGroup) return;

    filterGroup.order = selected;
    set({ rootCategory: rootCategory });
  },

  updateLimitFilter: (categoryID: string, filterID: string, selected: number | undefined) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryID, rootCategory);
    if (!category) return;
    const filterGroup = category.filterGroups?.find((group) => group.uuid === filterID);
    if (!filterGroup) return;

    filterGroup.limit = Number(selected);
    set({ rootCategory: rootCategory });
  },

  updateGroupByFilter: (categoryID: string, filterID: string, selected: string) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryID, rootCategory);
    if (!category) return;
    const filterGroup = category.filterGroups?.find((group) => group.uuid === filterID);
    if (!filterGroup) return;

    filterGroup.groupBy = selected;
    set({ rootCategory: rootCategory });
  },
}));

// export const useCategoryTreeStore = (selector: (state: CategoryTreeState & CategoryTreeGetters & CategoryTreeMutations) => any) =>
// useStore(categoryTreeStore, selector);
