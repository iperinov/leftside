import type TreeItemData from "../TreeItemData";

export default function iterateItem<T extends TreeItemData<T>>(item: T, callback: (item: T) => boolean): boolean {
  if (!callback(item)) return false;
  for (const child of item.children || []) {
    if (!iterateItem(child, callback)) return false;
  }
  return true;
}
