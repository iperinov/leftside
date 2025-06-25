import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";
import type TreeItemData from "./TreeItemData";

interface AddToParentConfig<T extends TreeItemData> {
  allowed: (level: number, parent: T) => boolean;
  handler: (level: number, parent: T) => void;
  toString: (level: number, parent: T) => string;
  inProgressID?: string;
}

interface ReorderConfig<T extends TreeItemData> {
  allowed: (item: T, parent: T) => boolean;
  handler: (item: T, oldParent: T, newParent: T) => void;
}

interface ExpandConfig<T extends TreeItemData> {
  allowed: (item: T, level: number) => boolean;
  itemIDs: string[];
  handler: (item: T, expand: boolean) => void;
}

interface SelectionConfig<T extends TreeItemData> {
  allowed: (item: T) => boolean;
  selectedID: string;
  handler: (item: T) => void;
}

interface ContextMenuConfig<T extends TreeItemData> {
  canItemHaveContextMenu?: (item: T) => boolean;
  menuItems: MenuItem<T>[];
}

export default interface TreeConfig<T extends TreeItemData> {
  addToParent?: AddToParentConfig<T>;
  expand?: ExpandConfig<T>;
  reorder?: ReorderConfig<T>;
  selection?: SelectionConfig<T>;
  contextMenu?: ContextMenuConfig<T>;
}