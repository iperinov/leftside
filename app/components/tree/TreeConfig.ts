import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";
import type TreeItemData from "./TreeItemData";

export default interface TreeConfig {
  isFinalNode?: (item: TreeItemData) => boolean;
  selectedID?: string;
  onSelected?: (parentID?: string) => void;

  expandedItems: string[];
  expandItem: (id: string, expand: boolean) => void;

  onAddLevel?: (parentID?: string) => void;

  menuItems?: MenuItem[];

  mutationInProgress?: boolean;
}