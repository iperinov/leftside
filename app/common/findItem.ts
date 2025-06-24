import type TreeItemData from "~/components/tree/TreeItemData";


export function findItem(id: string, subtree: TreeItemData[]): TreeItemData | undefined {
  return findItemBy((item => item.id === id), subtree);
}

export function findItemBy(compare: (item: TreeItemData) => boolean, subtree: TreeItemData[]): TreeItemData | undefined {
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

export function findItemTrail(id: string, subtree: TreeItemData[]): TreeItemData[] | undefined {
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

export function findItemSiblings(id: string, subtree: TreeItemData[]): TreeItemData[] | undefined {
  const itemParent = findItemParent(id, subtree)
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

export function findItemParent<T extends TreeItemData>(id: string, subtree: TreeItemData[]): TreeItemData | undefined {
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