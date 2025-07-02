import type ItemData from "./ItemData";

export function allItemData(): ItemData<string>;
export function allItemData(): ItemData<number>;
export function allItemData(): ItemData<any> {
  return {
    id: typeof arguments[0] === "number" ? -1 : "all",
    name: "All"
  };
}
