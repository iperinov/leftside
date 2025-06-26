import type TreeItemData from "../TreeItemData";


export function findItem<T extends TreeItemData<T>>(id: string, subtree: T[]): T | undefined {
  return findItemBy((item => item.id === id), subtree);
}

export function findItemBy<T extends TreeItemData<T>>(compare: (item: T) => boolean, subtree: T[]): T | undefined {
  for (const item of subtree) {
    if (compare(item)) {
      return item;
    }
    if (!item.children || item.children.length === 0) {
      continue;
    }

    const found = findItemBy(compare, item.children);
    if (found) {
      return found;
    }
  }

  return undefined;
}

export function findItemTrail<T extends TreeItemData<T>>(id: string, subtree: T[]): T[] | undefined {
  for (const item of subtree) {
    if (item.id === id) {
      return [item];
    }
    if (!item.children || item.children.length === 0) {
      continue;
    }

    const found = findItemTrail(id, item.children);
    if (found) {
      return [item, ...found];
    }
  }

  return undefined;
}

export function findItemSiblings<T extends TreeItemData<T>>(id: string, subtree: T[]): T[] | undefined {
  const itemParent = findItemParent(id, subtree);
  if (itemParent?.children) {
    return itemParent.children
  }
  for (const item of subtree) {
    if (item.id === id) {
      return subtree
    }
  }
  return undefined;
}

export function findItemParent<T extends TreeItemData<T>>(id: string, subtree: T[]): T | undefined {
  for (const item of subtree) {
    if (item.id === id) {
      return undefined; // The item itself cannot be its own parent
    }
    if (item.children && item.children.some(child => child.id === id)) {
      return item;
    }
    if (!item.children || item.children.length === 0) {
      continue;
    }

    const found = findItemParent<T>(id, item.children);
    if (found) {
      return found;
    }
  }

  return undefined;
}