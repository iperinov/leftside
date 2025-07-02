import type ItemData from "./ItemData";

/*export function allItemData(): ItemData<string>;
export function allItemData(): ItemData<number>;
export function allItemData(): ItemData<any> {
  return {
    id: typeof arguments[0] === "number" ? -1 : "all",
    name: "All",
  };
}*/

export function allItemData<T extends string | number>(): ItemData<T> {
  const value = undefined as unknown as T;

  return {
    id: (typeof value === "number" ? -1 : "all") as T,
    name: "All",
  };
}
