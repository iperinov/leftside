import { Select } from "@radix-ui/themes";
import type ItemData from "~/types/ItemData";

interface ItemTypeSelectProps<T> {
  value?: T;
  items: ItemData<T>[];
  onChange?: (value: T) => void;
}

export default function SelectComponent<T>({ value, items, onChange }: ItemTypeSelectProps<T>) {
  return (
    <Select.Root value={value !== undefined ? String(value) : ""} onValueChange={(value: string) => onChange?.(value as T)}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          {items.map((item) => (
            <Select.Item key={String(item.id)} value={String(item.id)}>
              {item.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
