import DropdownContextMenu, { type ContextAction } from "../dropdownContextMenu/DropdownContextMenu";

interface ConfigCardContextMenuProps {
  context: string;
  items: ContextAction[];
}

export default function ConfigCardContextMenu({ context, items }: ConfigCardContextMenuProps) {
  return <DropdownContextMenu modal={true} items={items} context={context} />;
}