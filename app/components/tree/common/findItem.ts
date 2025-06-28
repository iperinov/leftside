import type TreeItemData from "../TreeItemData";


export function findItem<T extends TreeItemData<T>>(uuid: string, subtree: T[]): T | undefined {
  return findItemBy((item => item.uuid === uuid), subtree);
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

export function findItemTrail<T extends TreeItemData<T>>(uuid: string, subtree: T[]): T[] | undefined {
  for (const item of subtree) {
    if (item.uuid === uuid) {
      return [item];
    }
    if (!item.children || item.children.length === 0) {
      continue;
    }

    const found = findItemTrail(uuid, item.children);
    if (found) {
      return [item, ...found];
    }
  }

  return undefined;
}

export function findItemSiblings<T extends TreeItemData<T>>(uuid: string, subtree: T[]): T[] | undefined {
  const itemParent = findItemParent(uuid, subtree);
  if (itemParent?.children) {
    return itemParent.children
  }
  for (const item of subtree) {
    if (item.uuid === uuid) {
      return subtree
    }
  }
  return undefined;
}

export function findItemParent<T extends TreeItemData<T>>(uuid: string, subtree: T[]): T | undefined {
  for (const item of subtree) {
    if (item.uuid === uuid) {
      return undefined; // The item itself cannot be its own parent
    }
    if (item.children && item.children.some(child => child.uuid === uuid)) {
      return item;
    }
    if (!item.children || item.children.length === 0) {
      continue;
    }

    const found = findItemParent<T>(uuid, item.children);
    if (found) {
      return found;
    }
  }

  return undefined;
}