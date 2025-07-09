import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { create, createStore, useStore } from "zustand";
import type { FilterGroup } from "~/api/scs/configurations/config.types";
import type CategoryTreeItem from "~/components/categories/tree/CategoryTreeItem";
import { findItem, findItemParent, findItemSiblings, findItemTrail } from "~/components/tree/common/findItem";
import iterateItem from "~/components/tree/common/iterateItem";

interface CategoryTreeState {
  rootCategory: CategoryTreeItem;
}

interface CategoryTreeGetters {
  getFilterGroup: (categoryUUID: string, filterGroupUUID: string) => FilterGroup | undefined;

  findCategory: (uuid: string) => CategoryTreeItem | undefined;
  findParentCategory: (uuid: string) => CategoryTreeItem | undefined;
  findCategorySiblings: (uuid: string) => CategoryTreeItem[] | undefined;
  findCategotyTrail: (uuid: string) => CategoryTreeItem[] | undefined;

  filters: (categoryUUID: string, filterGroupUUID: string, type: string) => string[];
  sportFilters: (categoryUUID: string, filterGroupUUID: string) => string[];
  leagueFilters: (categoryUUID: string, filterGroupUUID: string) => string[];
  marketFilters: (categoryUUID: string, filterGroupUUID: string) => string[];
  statusFilter: (categoryUUID: string, filterGroupUUID: string) => string;
  timeFilter: (categoryUUID: string, filterGroupUUID: string) => string;
  sortByFilter: (categoryUUID: string, filterGroupUUID: string) => "asc" | "desc" | undefined;
  limitFilter: (categoryUUID: string, filterGroupUUID: string) => number | undefined;
  groupByFilter: (categoryUUID: string, filterGroupUUID: string) => string | undefined;
}

interface CategoryTreeMutations {
  reset: (categories: CategoryTreeItem[]) => void;
  addCategory: (parentID: string, newItem: CategoryTreeItem) => boolean;
  renameCategory: (uuid: string, newName: string) => boolean;
  deleteCategory: (uuid: string) => boolean;
  duplicateCategory: (uuid: string, name: string, parentUUID: string) => boolean;

  addEmptyFilterGroup: (categoryUUID: string) => boolean;
  deleteFilterGroup: (categoryUUID: string, groupUUID: string) => boolean;
  duplicateFilterGroup: (categoryUUID: string, groupUUID: string) => boolean;
  moveFilterGroupTo: (categoryUUID: string, groupUUID: string, moveOnPlaceOfGroupUUID: string) => boolean;

  updateSportsFilter: (categoryUUID: string, filterGroupUUID: string, selected: string[]) => void;
  updateLeaguesFilter: (categoryUUID: string, filterGroupUUID: string, selected: string[]) => void;
  updateMarketsFilter: (categoryUUID: string, filterGroupUUID: string, selected: string[]) => void;
  updateStatusFilter: (categoryUUID: string, filterGroupUUID: string, selected: string) => void;
  updateTimeFilter: (categoryUUID: string, filterGroupUUID: string, selected: string) => void;
  updateSortByFilter: (categoryUUID: string, filterGroupUUID: string, selected: "asc" | "desc") => void;
  updateLimitFilter: (categoryUUID: string, filterGroupUUID: string, selected: number | undefined) => void;
  updateGroupByFilter: (categoryUUID: string, filterGroupUUID: string, selected: string) => void;

  updateFilters: (
    categoryUUID: string,
    filterGroupUUID: string,
    type: "sport" | "region" | "league" | "game" | "period" | "market" | "time" | "status",
    selected: string[],
  ) => void;
}

const rootCategoryUUID = "root-categories-id";

function newItemUUID(): string {
  return uuidv4();
}

export const useCategoryTreeStore = create<CategoryTreeState & CategoryTreeGetters & CategoryTreeMutations>((set, get) => ({
  // State
  rootCategory: { id: rootCategoryUUID, name: "", type: "nested", children: [] },

  // Getters
  findCategory: (uuid: string) => findItem(uuid, get().rootCategory),
  findParentCategory: (uuid: string) => findItemParent(uuid, get().rootCategory),
  findCategorySiblings: (uuid: string) => get().findParentCategory(uuid)?.children,
  findCategotyTrail: (uuid: string) => findItemTrail(uuid, get().rootCategory),
  getFilterGroup: (categoryUUID: string, filterGroupUUID: string) =>
    get()
      .findCategory(categoryUUID)
      ?.filterGroups?.find((group) => group.uuid === filterGroupUUID),
  filters: (categoryUUID: string, filterGroupUUID: string, type: string) =>
    get()
      .getFilterGroup(categoryUUID, filterGroupUUID)
      ?.filters.find((filter) => filter.type === type)?.values || [],
  sportFilters: (categoryUUID: string, filterGroupUUID: string) => get().filters(categoryUUID, filterGroupUUID, "sport"),
  leagueFilters: (categoryUUID: string, filterGroupUUID: string) => get().filters(categoryUUID, filterGroupUUID, "league"),
  marketFilters: (categoryUUID: string, filterGroupUUID: string) => get().filters(categoryUUID, filterGroupUUID, "market"),
  statusFilter: (categoryUUID: string, filterGroupUUID: string) => get().filters(categoryUUID, filterGroupUUID, "status")[0],
  timeFilter: (categoryUUID: string, filterGroupUUID: string) => get().filters(categoryUUID, filterGroupUUID, "time")[0],
  sortByFilter: (categoryUUID: string, filterGroupUUID: string) => get().getFilterGroup(categoryUUID, filterGroupUUID)?.order,
  limitFilter: (categoryUUID: string, filterGroupUUID: string) => get().getFilterGroup(categoryUUID, filterGroupUUID)?.limit,
  groupByFilter: (categoryUUID: string, filterGroupUUID: string) => get().getFilterGroup(categoryUUID, filterGroupUUID)?.groupBy,

  // Mutations
  reset: (categories) => {
    set((state) => ({
      rootCategory: { ...state.rootCategory, children: categories },
    }));
  },

  addCategory: (parentUUID, newItem) => {
    newItem.changed = true; 
    const rootCategory = structuredClone(get().rootCategory);
    if (parentUUID === rootCategoryUUID) {
      rootCategory.children = [...(rootCategory.children || []), newItem];
    } else if (rootCategory.children) {
      const parent = findItem(parentUUID, rootCategory);
      if (!parent) return false;
      parent.children = [...(parent.children || []), newItem];
    }
    set({ rootCategory: rootCategory });
    return true;
  },

  renameCategory: (uuid, newName) => {
    const rootCategory = structuredClone(get().rootCategory);
    if (!rootCategory.children) return false;
    const item = findItem(uuid, rootCategory);
    if (!item) return false;
    item.name = newName;
    item.changed = true; 
    set({ rootCategory: rootCategory });
    return true;
  },

  deleteCategory: (uuid) => {
    const rootCategory = structuredClone(get().rootCategory);
    if (!rootCategory.children) return false;
    const siblings = findItemSiblings(uuid, rootCategory);
    if (!siblings) return false;
    const itemIndex = siblings.findIndex((item) => item.id === uuid);
    if (itemIndex === -1) return false;
    siblings.splice(itemIndex, 1);
    set({ rootCategory: rootCategory });
    return true;
  },

  duplicateCategory: (uuid, name, parentUUID) => {
    const rootCategory = structuredClone(get().rootCategory);
    const parent = findItem(parentUUID, rootCategory);
    if (!parent) return false;
    const item = findItem(uuid, parent);
    if (!item) return false;
    const newItem = { ...structuredClone(item), name };
    iterateItem(newItem, (item) => {
      item.id = newItemUUID();
      item.changed = true; 
    });
    if (parent.children) {
      parent.children.push(newItem);
    } else {
      parent.children = [newItem];
    }
    set({ rootCategory: rootCategory });
    return true;
  },

  addEmptyFilterGroup: (categoryUUID: string) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryUUID, rootCategory);
    if (!category) return false;
    const emptyFilterGroup = {
      uuid: newItemUUID(),
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

  deleteFilterGroup: (categoryUUID: string, groupUUID: string) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryUUID, rootCategory);
    if (!category) return false;
    category.filterGroups = category.filterGroups?.filter((item) => item.uuid !== groupUUID);
    set({ rootCategory: rootCategory });
    return true;
  },

  duplicateFilterGroup: (categoryUUID: string, groupUUID: string) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryUUID, rootCategory);
    if (!category) return false;
    const filterGroup = category.filterGroups?.find((item) => item.uuid === groupUUID);
    if (!filterGroup) return false;
    const newFilterGroup = {
      ...structuredClone(filterGroup),
      uuid: newItemUUID(),
    };
    category.filterGroups?.push(newFilterGroup);
    set({ rootCategory: rootCategory });
    return true;
  },

  moveFilterGroupTo: (categoryUUID: string, groupUUID: string, moveOnPlaceOfGroupUUID: string) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryUUID, rootCategory);
    if (!category || !category.filterGroups) return false;
    const index = category.filterGroups.findIndex((item) => item.uuid === groupUUID);
    if (index === -1) return false;
    const moveOnPlaceIndex= category.filterGroups.findIndex((item) => item.uuid === moveOnPlaceOfGroupUUID);
    if (moveOnPlaceIndex === -1) return false;
    category.filterGroups = arrayMove(category.filterGroups, index, moveOnPlaceIndex);
    set({ rootCategory: rootCategory });
    return true;
  },

  updateFilters: (
    categoryUUID: string,
    filterGroupUUID: string,
    type: "sport" | "region" | "league" | "game" | "period" | "market" | "time" | "status",
    selected: string[],
  ) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryUUID, rootCategory);
    if (!category) return;
    const filterGroup = category.filterGroups?.find((group) => group.uuid === filterGroupUUID);
    if (!filterGroup) return;

    const existingFilter = filterGroup.filters.find((filter) => filter.type === type);
    if (existingFilter) {
      existingFilter.values = selected;
    } else {
      filterGroup.filters.push({ type: type, values: selected });
    }
    set({ rootCategory: rootCategory });
  },

  updateSportsFilter: (categoryUUID: string, filterGroupUUID: string, selected: string[]) => {
    get().updateFilters(categoryUUID, filterGroupUUID, "sport", selected);
  },

  updateLeaguesFilter: (categoryUUID: string, filterGroupUUID: string, selected: string[]) => {
    get().updateFilters(categoryUUID, filterGroupUUID, "league", selected);
  },

  updateMarketsFilter: (categoryUUID: string, filterGroupUUID: string, selected: string[]) => {
    get().updateFilters(categoryUUID, filterGroupUUID, "market", selected);
  },

  updateStatusFilter: (categoryUUID: string, filterGroupUUID: string, selected: string) => {
    get().updateFilters(categoryUUID, filterGroupUUID, "status", [selected]);
  },

  updateTimeFilter: (categoryUUID: string, filterGroupUUID: string, selected: string) => {
    get().updateFilters(categoryUUID, filterGroupUUID, "time", [selected]);
  },

  updateSortByFilter: (categoryUUID: string, filterGroupUUID: string, selected: "asc" | "desc") => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryUUID, rootCategory);
    if (!category) return;
    const filterGroup = category.filterGroups?.find((group) => group.uuid === filterGroupUUID);
    if (!filterGroup) return;

    filterGroup.order = selected;
    set({ rootCategory: rootCategory });
  },

  updateLimitFilter: (categoryUUID: string, filterGroupUUID: string, selected: number | undefined) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryUUID, rootCategory);
    if (!category) return;
    const filterGroup = category.filterGroups?.find((group) => group.uuid === filterGroupUUID);
    if (!filterGroup) return;

    filterGroup.limit = Number(selected);
    set({ rootCategory: rootCategory });
  },

  updateGroupByFilter: (categoryUUID: string, filterGroupUUID: string, selected: string) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryUUID, rootCategory);
    if (!category) return;
    const filterGroup = category.filterGroups?.find((group) => group.uuid === filterGroupUUID);
    if (!filterGroup) return;

    filterGroup.groupBy = selected;
    set({ rootCategory: rootCategory });
  },
}));

// export const useCategoryTreeStore = (selector: (state: CategoryTreeState & CategoryTreeGetters & CategoryTreeMutations) => any) =>
// useStore(categoryTreeStore, selector);
