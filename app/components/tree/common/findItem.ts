import type TreeItemData from "../TreeItemData";

export function findItem<T extends TreeItemData<T>>(
  id: string,
  root: T,
): T | undefined {
  return findItemBy((item) => item.id === id, root);
}

function findItemBy<T extends TreeItemData<T>>(
  compare: (item: T) => boolean,
  root: T,
): T | undefined {
  if (compare(root)) return root;
  if (!root.children) return undefined;

  for (const item of root.children) {
    const found = findItemBy(compare, item);
    if (found) return found;
  }
  return undefined;
}

// export function findItemTrail<T extends TreeItemData<T>>(id: string, subtree: T[]): T[] | undefined {
//   for (const item of subtree) {
//     if (item.id === id) {
//       return [item];
//     }
//     if (!item.children || item.children.length === 0) {
//       continue;
//     }

//     const found = findItemTrail(id, item.children);
//     if (found) {
//       return [item, ...found];
//     }
//   }

//   return undefined;
// }

export function findItemSiblings<T extends TreeItemData<T>>(
  id: string,
  root: T,
): T[] | undefined {
  return findItemParent(id, root)?.children;
}

export function findItemParent<T extends TreeItemData<T>>(
  id: string,
  root: T,
): T | undefined {
  for (const item of root.children || []) {
    if (item.id === id) {
      return root;
    }

    const found = findItemParent(id, item);
    if (found) {
      return found;
    }
  }

  return undefined;
}
