import type TreeStruct from "./TreeStruct";

export function duplicateItem<T extends TreeStruct<T>>(item: T): T {
  const newItem: T = { ...item, id: `duplicate-${item.id}` };
  if (item.children) {
    newItem.children = item.children.map(duplicateItem);
  }
  return newItem;
}
