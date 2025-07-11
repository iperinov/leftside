import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";
import type TreeItemData from "./TreeItemData";

interface AddToParentConfig<T extends TreeItemData<T>> {
  allowed: (level: number, parent: T) => boolean;
  handler: (level: number, parent: T) => void;
  toString: (level: number, parent: T) => string;
  inProgressID?: string;
}

interface ReorderConfig<T extends TreeItemData<T>> {
  allowed: (item: T, parent: T) => boolean;
  handler: (parent: T, childID: string, movedOnPlaceOfChildID: string) => void;
}

interface ExpandConfig<T extends TreeItemData<T>> {
  allowed: (item: T, level: number) => boolean;
  itemIDs: string[];
  handler: (item: T, expand: boolean) => void;
}

interface SelectionConfig<T extends TreeItemData<T>> {
  allowed: (item: T) => boolean;
  selectedID?: string;
  handler: (item: T) => void;
}

interface ContextMenuConfig<T extends TreeItemData<T>> {
  itemsFor?: (item: T) => MenuItem<T>[];
}

interface FilterConfig<T extends TreeItemData<T>> {
  hideItem?: (item: T) => boolean;
}

export interface OptionalNode {
  key?: string;
  node: React.ReactNode;
}
interface OptionalsConfig<T extends TreeItemData<T>> {
  getFor: (item: T) => OptionalNode[];
}

interface FocusAttentionConfig<T extends TreeItemData<T>> {
  allow: (item: T) => boolean;
  done: (item: T) => void;
}

export default interface TreeConfig<T extends TreeItemData<T>> {
  addToParent?: AddToParentConfig<T>;
  expand?: ExpandConfig<T>;
  reorder?: ReorderConfig<T>;
  selection?: SelectionConfig<T>;
  contextMenu?: ContextMenuConfig<T>;
  filter?: FilterConfig<T>;
  additionalElements?: OptionalsConfig<T>;
  focusAttention?: FocusAttentionConfig<T>;
}
