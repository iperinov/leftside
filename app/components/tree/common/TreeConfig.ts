import type { MenuItem } from "../../dropdownContextMenu/DropdownContextMenu";
import type TreeItemData from "../common/TreeItemData";

interface AddToParentConfig {
  allowed: (level: number, parent: TreeItemData) => boolean;
  handler: (level: number, parent: TreeItemData) => void;
  toString: (level: number, parent: TreeItemData) => string;
  inProgressID?: string;
}

interface ReorderConfig {
  allowed: (item: TreeItemData, parent: TreeItemData) => boolean;
  handler: (item: TreeItemData, oldParent: TreeItemData, newParent: TreeItemData) => void;
}

interface ExpandConfig {
  allowed: (item: TreeItemData, level: number) => boolean;
  itemIDs: string[];
  handler: (item: TreeItemData, expand: boolean) => void;
}

interface SelectionConfig {
  allowed: (item: TreeItemData) => boolean;
  selectedID: string;
  handler: (item: TreeItemData) => void;
}

interface ContextMenuConfig {
  canItemHaveContextMenu?: (id: string) => boolean;
  menuItems?: MenuItem<TreeItemData>[];
}

export default interface TreeConfig extends ContextMenuConfig {
  addToParent?: AddToParentConfig;
  expand?: ExpandConfig;
  reorder?: ReorderConfig;
  selection?: SelectionConfig;
  contextMenu?: ContextMenuConfig;
}