import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import type {
  AllFilter,
  Config,
  Filter,
  FilterGroup,
  FiltersTypeBool,
  FiltersTypeInteger,
  FiltersTypeString,
  FilterType,
  GameFilter,
  GroupType,
  LeagueFilter,
  MarketFilter,
  OrderType,
  PeriodFilter,
  RegionFilter,
  SportFilter,
  StatusFilter,
  TimeFilter,
  TimeString,
} from "~/api/sccs/types.gen";
import { allFilter, allItemNumber, allItemString } from "~/components/categories/AllItemData";
import type CategoryTreeItem from "~/components/categories/tree/CategoryTreeItem";
import { findItem, findItemParent, findItemSiblings, findItemTrail } from "~/components/tree/common/findItem";
import iterateItem from "~/components/tree/common/iterateItem";

interface CategoryTreeState {
  configuration: Config
  rootCategory: CategoryTreeItem;
}

interface CategoryTreeGetters {
  getFilterGroup: (categoryUUID: string, filterGroupUUID: string) => FilterGroup | undefined;

  findCategory: (uuid: string) => CategoryTreeItem | undefined;
  findParentCategory: (uuid: string) => CategoryTreeItem | undefined;
  findFirstLevelParent: (uuid: string) => CategoryTreeItem | undefined;
  findCategorySiblings: (uuid: string) => CategoryTreeItem[] | undefined;
  findCategoryTrail: (uuid: string) => CategoryTreeItem[] | undefined;

  filter: (
    categoryUUID: string,
    filterGroupUUID: string,
    type: FilterType
  ) => SportFilter | RegionFilter | GameFilter | LeagueFilter | PeriodFilter | MarketFilter | StatusFilter | TimeFilter;
  sportFilters: (categoryUUID: string, filterGroupUUID: string) => SportFilter;
  leagueFilters: (categoryUUID: string, filterGroupUUID: string) => LeagueFilter;
  marketFilters: (categoryUUID: string, filterGroupUUID: string) => MarketFilter;
  statusFilter: (categoryUUID: string, filterGroupUUID: string) => StatusFilter;
  timeFilter: (categoryUUID: string, filterGroupUUID: string) => TimeFilter;
  sortByFilter: (categoryUUID: string, filterGroupUUID: string) => OrderType | undefined;
  limitFilter: (categoryUUID: string, filterGroupUUID: string) => number | undefined;
  groupByFilter: (categoryUUID: string, filterGroupUUID: string) => GroupType | undefined;
}

interface CategoryTreeMutations {
  reset: (configuration: Config, categoriesTree: CategoryTreeItem[]) => void;
  addCategory: (parentID: string, newItem: CategoryTreeItem) => boolean;
  renameCategory: (uuid: string, newName: string) => boolean;
  deleteCategory: (uuid: string) => boolean;
  duplicateCategory: (uuid: string, name: string, parentUUID: string) => boolean;
  moveCategoryTo: (parentUUID: string, categoryUUID: string, moveOnPlaceOfCategoryUUID: string) => boolean;

  addEmptyFilterGroup: (categoryUUID: string) => boolean;
  deleteFilterGroup: (categoryUUID: string, groupUUID: string) => boolean;
  duplicateFilterGroup: (categoryUUID: string, groupUUID: string) => boolean;
  moveFilterGroupTo: (categoryUUID: string, groupUUID: string, moveOnPlaceOfGroupUUID: string) => boolean;

  updateFilters: <S extends FiltersTypeString | FiltersTypeInteger | TimeString | boolean | AllFilter, F extends Filter>(categoryUUID: string, filterGroupUUID: string, type: FilterType, selected: S) => void;
  updateSportsFilter: (categoryUUID: string, filterGroupUUID: string, selected: string[] | AllFilter) => void;
  updateLeaguesFilter: (categoryUUID: string, filterGroupUUID: string, selected: string[] | AllFilter) => void;
  updateMarketsFilter: (categoryUUID: string, filterGroupUUID: string, selected: number[] | AllFilter) => void;
  updateStatusFilter: (categoryUUID: string, filterGroupUUID: string, selected: boolean | AllFilter) => void;
  updateTimeFilter: (categoryUUID: string, filterGroupUUID: string, selected: TimeString | AllFilter) => void;
  updateSortByFilter: (categoryUUID: string, filterGroupUUID: string, selected: OrderType) => void;
  updateLimitFilter: (categoryUUID: string, filterGroupUUID: string, selected: number | undefined) => void;
  updateGroupByFilter: (categoryUUID: string, filterGroupUUID: string, selected: GroupType) => void;
}

const rootCategoryUUID = "root-categories-id";

function newItemUUID(): string {
  return uuidv4();
}

export const useCategoryTreeStore = create<CategoryTreeState & CategoryTreeGetters & CategoryTreeMutations>((set, get) => ({
  // State
  configuration: {} as Config,
  rootCategory: { id: rootCategoryUUID, name: "", type: "nested", children: [] },

  // Getters
  findCategory: (uuid: string) => findItem(uuid, get().rootCategory),
  findParentCategory: (uuid: string) => findItemParent(uuid, get().rootCategory),
  findFirstLevelParent: (uuid: string) => findItemTrail(uuid, get().rootCategory)?.[0],
  findCategorySiblings: (uuid: string) => get().findParentCategory(uuid)?.children,
  findCategoryTrail: (uuid: string) => findItemTrail(uuid, get().rootCategory),
  getFilterGroup: (categoryUUID: string, filterGroupUUID: string) =>
    get()
      .findCategory(categoryUUID)
      ?.filterGroups?.find((group) => group.uuid === filterGroupUUID),
  filter: (categoryUUID: string, filterGroupUUID: string, type: FilterType) => {
    const filter = get()
      .getFilterGroup(categoryUUID, filterGroupUUID)
      ?.filters.find((filter) => filter.type === type);
    if (!filter) throw new Error(`Filter of type ${type} not found in category ${categoryUUID} and group ${filterGroupUUID}`);

    switch (type) {
      case "sport":
        return filter as SportFilter;
      case "region":
        return filter as RegionFilter;
      case "league":
        return filter as LeagueFilter;
      case "game":
        return filter as GameFilter;
      case "period":
        return filter as PeriodFilter;
      case "market":
        return filter as MarketFilter;
      case "status":
        return filter as StatusFilter;
      case "time":
        return filter as TimeFilter;
    }
  },
  sportFilters: (categoryUUID: string, filterGroupUUID: string) => get().filter(categoryUUID, filterGroupUUID, "sport") as SportFilter,
  leagueFilters: (categoryUUID: string, filterGroupUUID: string) => get().filter(categoryUUID, filterGroupUUID, "league") as LeagueFilter,
  marketFilters: (categoryUUID: string, filterGroupUUID: string) => get().filter(categoryUUID, filterGroupUUID, "market") as MarketFilter,
  statusFilter: (categoryUUID: string, filterGroupUUID: string) => get().filter(categoryUUID, filterGroupUUID, "status") as StatusFilter,
  timeFilter: (categoryUUID: string, filterGroupUUID: string) => get().filter(categoryUUID, filterGroupUUID, "time") as TimeFilter,
  sortByFilter: (categoryUUID: string, filterGroupUUID: string) => get().getFilterGroup(categoryUUID, filterGroupUUID)?.order,
  limitFilter: (categoryUUID: string, filterGroupUUID: string) => get().getFilterGroup(categoryUUID, filterGroupUUID)?.limit,
  groupByFilter: (categoryUUID: string, filterGroupUUID: string) => get().getFilterGroup(categoryUUID, filterGroupUUID)?.groupBy,

  // Mutations
  reset: (configuration, categoriesTree) => {
    set((state) => ({
      configuration: configuration,
      rootCategory: { ...state.rootCategory, children: categoriesTree },
    }));
  },

  addCategory: (parentUUID, newItem) => {
    newItem.focusAttention = true;
    const rootCategory = structuredClone(get().rootCategory);
    console.log("Adding new item:", newItem, "to parent:", parentUUID);
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
    item.focusAttention = true;
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
    if (!parent || !parent.children) return false;
    const itemIndex = parent.children.findIndex((item) => item.id === uuid);
    if (itemIndex === -1) return false;
    const newItem = { ...structuredClone(parent.children[itemIndex]), name, focusAttention: true };
    iterateItem<CategoryTreeItem>(newItem, (item) => {
      item.id = newItemUUID();
    });

    parent.children.splice(itemIndex + 1, 0, newItem);
    set({ rootCategory: rootCategory });
    return true;
  },

  moveCategoryTo: (parentUUID: string, categoryUUID: string, moveOnPlaceOfCategoryUUID: string) => {
    const rootCategory = structuredClone(get().rootCategory);
    const parent = findItem(parentUUID, rootCategory);
    if (!parent || !parent.children) return false;
    const index = parent.children.findIndex((item) => item.id === categoryUUID);
    if (index === -1) return false;
    const moveOnPlaceIndex = parent.children.findIndex((item) => item.id === moveOnPlaceOfCategoryUUID);
    if (moveOnPlaceIndex === -1) return false;
    parent.children = arrayMove(parent.children, index, moveOnPlaceIndex);
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
      groupBy: "dayLeague",
      order: "asc",
      limit: 1,
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
    const moveOnPlaceIndex = category.filterGroups.findIndex((item) => item.uuid === moveOnPlaceOfGroupUUID);
    if (moveOnPlaceIndex === -1) return false;
    category.filterGroups = arrayMove(category.filterGroups, index, moveOnPlaceIndex);
    set({ rootCategory: rootCategory });
    return true;
  },

  updateFilters: <S extends FiltersTypeString | FiltersTypeInteger | TimeString | boolean | AllFilter, F extends Filter>(categoryUUID: string, filterGroupUUID: string, type: FilterType, selected: S) => {
    const rootCategory = structuredClone(get().rootCategory);
    const category = findItem(categoryUUID, rootCategory);
    if (!category) return;
    const filterGroup = category.filterGroups?.find((group) => group.uuid === filterGroupUUID);
    if (!filterGroup) return;

    const existingFilter = filterGroup.filters.find((filter) => filter.type === type);
    const isAllFilter = 
      (selected as FiltersTypeString).find((item) => item === allItemString.id) ||
      (selected as FiltersTypeInteger).find((item) => item === allItemNumber.id) ||
      selected === allItemString.id;
    if (existingFilter) {
      existingFilter.value = isAllFilter ? allFilter : selected;
    } else {
      filterGroup.filters.push({ type: type, value: selected } as F);
    }
    set({ rootCategory: rootCategory });
  },

  updateSportsFilter: (categoryUUID: string, filterGroupUUID: string, selected: string[] | AllFilter) => {
    get().updateFilters(categoryUUID, filterGroupUUID, "sport", selected);
  },

  updateLeaguesFilter: (categoryUUID: string, filterGroupUUID: string, selected: string[] | AllFilter) => {
    get().updateFilters(categoryUUID, filterGroupUUID, "league", selected);
  },

  updateMarketsFilter: (categoryUUID: string, filterGroupUUID: string, selected: number[] | AllFilter) => {
    get().updateFilters(categoryUUID, filterGroupUUID, "market", selected);
  },

  updateStatusFilter: (categoryUUID: string, filterGroupUUID: string, selected: boolean | AllFilter) => {
    get().updateFilters(categoryUUID, filterGroupUUID, "status", selected);
  },

  updateTimeFilter: (categoryUUID: string, filterGroupUUID: string, selected: TimeString | AllFilter) => {
    get().updateFilters(categoryUUID, filterGroupUUID, "time", selected);
  },

  updateSortByFilter: (categoryUUID: string, filterGroupUUID: string, selected: OrderType) => {
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

  updateGroupByFilter: (categoryUUID: string, filterGroupUUID: string, selected: GroupType) => {
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
