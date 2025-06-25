import type TreeItemData from "../TreeItemData";

export default function iterateItem(item: TreeItemData, callback: (item: TreeItemData) => void): void {
  callback(item);
  if (item.children && item.children.length > 0) {
    for (const child of item.children) {
      iterateItem(child, callback);
    }
  }
}