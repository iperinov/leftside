import { DropdownMenu } from "@radix-ui/themes";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import "../../../styles/DropdownContextMenu.css";

export interface MenuItem {
  name: string;
  action: (crumbs: string[]) => void;
}

export interface DropdownContextMenuProps {
  items: MenuItem[];
  crumbs: string[];
}

export default function DropdownContextMenu({ items, crumbs }: DropdownContextMenuProps) {
  if (items.length === 0) {
    return null; // No items to display
  }

  return (
    <DropdownMenu.Root modal={true}>
      <DropdownMenu.Trigger className="place-content-center">
        <DotsHorizontalIcon />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end">
        {items.map((item) => (
          <DropdownMenu.Item
            key={item.name}
            onClick={(event) => {
              event.stopPropagation();
              item.action(crumbs);
            }}
          >
            {item.name}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
