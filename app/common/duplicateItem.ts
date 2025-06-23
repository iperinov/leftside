import type TreeStruct from "./TreeStruct";

export function duplicateItem<T extends TreeStruct<T>>(item: T, generateID?: () => string): T {
  const newItem: T = { ...item, id: generateID ? generateID() : `duplicate-${item.id}` };
  if (item.children) {
    newItem.children = item.children.map(child => duplicateItem(child, generateID));
  }
  return newItem;
}
