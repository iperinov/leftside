import { DropdownMenu } from "@radix-ui/themes";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import styles from "./DropdownContextMenu.module.css"; 

export interface MenuItem {
  name: string;
  action: (context: any) => void;
}

export interface DropdownContextMenuProps {
  items: MenuItem[];
  context?: any
}

export default function DropdownContextMenu({ items, context = undefined }: DropdownContextMenuProps) {
  if (items.length === 0) {
    return null; // No items to display
  }

  return (
    <DropdownMenu.Root modal={true}>
      <DropdownMenu.Trigger className={styles.icon}>
        <DotsHorizontalIcon />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end">
        {items.map((item) => (
          <DropdownMenu.Item
            key={item.name}
            onClick={(event) => {
              event.stopPropagation();
              item.action(context);
            }}
          >
            {item.name}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
