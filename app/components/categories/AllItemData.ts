import type ItemData from "~/types/ItemData";

export function allItemData<T extends string | number>(): ItemData<T> {
  const value = undefined as unknown as T;

  return {
    id: (typeof value === "number" ? -1 : "all") as T,
    name: "All",
  };
}
