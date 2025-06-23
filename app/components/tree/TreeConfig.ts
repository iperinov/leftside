import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";

export default interface TreeConfig {
  selectionEnabledOnLevels: number[];
  selectedID?: string;
  onSelected?: (parentID?: string) => void;

  onAddLevel?: (parentID?: string) => void;

  menuItems?: MenuItem[];

  mutationInProgress?: boolean;
}