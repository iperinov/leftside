import { Select } from "@radix-ui/themes";
import type ItemData from "~/types/ItemData";

interface ItemTypeSelectProps {
  value?: string;
  items: ItemData<string>[];
  onChange?: (value: string) => void;
}

export default function SelectComponent({
  value,
  items,
  onChange,
}: ItemTypeSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          {items.map((item) => (
            <Select.Item key={item.id} value={item.id}>
              {item.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
