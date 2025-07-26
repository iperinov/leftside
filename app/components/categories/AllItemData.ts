import type { AllFilter } from "~/api/sccs/types.gen";
import type ItemData from "~/types/ItemData";

export const allFilter: AllFilter = "all";
const allFilterNumberValue = -1;

export function allItemData<T extends string | number>(): ItemData<T> {
  const value = undefined as unknown as T;

  return {
    id: (typeof value === "number" ? allFilterNumberValue : allFilter) as T,
    name: "All",
  };
}

export const allItemString = allItemData<string>();
export const allItemNumber = allItemData<number>();

export function isAllFilter<T>(item: T | AllFilter): item is AllFilter {
  return item === allFilter;
}

export function isAllItem<T extends string | number>(item: ItemData<T>): boolean {
  return item.id === (typeof item.id === "number" ? allItemNumber.id : allItemString.id);
}

export function isAll<T extends string | number>(id: T): boolean {
  return id === (typeof id === "number" ? allItemNumber.id : allItemString.id);
}

export function isAllArray<T extends string | number>(ids: T[]): boolean {
  if (ids.length === 0) return false;
  const allID = allItemData<T>().id;
  return ids.includes(allID);
}
