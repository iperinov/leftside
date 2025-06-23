import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";

export default interface TreeConfig {
  selectedID?: string;
  onSelected?: (crumbs: string[]) => void;

  onAddLevel?: (crumbs: string[]) => void;

  menuItems?: MenuItem[];
}