import type TreeStruct from "./TreeStruct";


export function findItem<T extends TreeStruct<T>>(id: string, subtree: T[]): T | undefined {
  for (const item of subtree) {
    if (item.id === id) {
      return item;
    }
    if (!item.children || item.children.length === 0) {
      continue;
    }

    const found = findItem<T>(id, item.children);
    if (found) {
      return found;
    }
  }

  return undefined;
}

export function findItemTrail<T extends TreeStruct<T>>(id: string, subtree: T[]): T[] | undefined {
  for (const item of subtree) {
    if (item.id === id) {
      return [item];
    }
    if (!item.children || item.children.length === 0) {
      continue;
    }

    const found = findItemTrail<T>(id, item.children);
    if (found) {
      return [item, ...found];
    }
  }

  return undefined;
}