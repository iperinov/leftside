import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";

export default interface TreeConfig {
  selectedID?: string;
  onSelected?: (parentIDs: string[], id: string) => void;

  onAddLevel?: (parentIDs: string[]) => void;

  menuItems?: MenuItem[];
}