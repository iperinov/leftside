import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";

export default interface TreeConfig {
  selectedID?: string;
  onSelected?: (parentID?: string) => void;

  onAddLevel?: (parentID?: string) => void;

  menuItems?: MenuItem[];

  mutationInProgress?: boolean;
}