import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "@radix-ui/themes";
import styles from "./DropdownContextMenu.module.css";

export interface MenuItem<T> {
  name: string;
  action: (context?: T) => void;
  disabled?: boolean;
}

export interface DropdownContextMenuProps<T> {
  items: MenuItem<T>[];
  context?: T;
}

export default function DropdownContextMenu<T>({ items, context }: DropdownContextMenuProps<T>) {
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
            disabled={item.disabled}
            onSelect={(event) => {
              if (item.disabled) return;
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
