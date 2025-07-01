import type TreeItemData from "../TreeItemData";

export default function iterateItem<T extends TreeItemData<T>>(
  item: T,
  callback: (item: T) => void,
): void {
  callback(item);
  for (const child of item.children || []) {
    iterateItem(child, callback);
  }
}
