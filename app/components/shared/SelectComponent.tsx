import { Select } from "@radix-ui/themes";
import { useMemo } from "react";
import type ItemData from "~/types/ItemData";

interface ItemTypeSelectProps<T> {
  value?: T;
  items: ItemData<T>[];
  onChange?: (value: T) => void;
}

export default function SelectComponent<T>({
  value,
  items,
  onChange,
}: ItemTypeSelectProps<T>) {
  const stringToValueMap = useMemo(() => {
    const map = new Map<string, T>();
    for (const item of items) {
      map.set(String(item.id), item.id);
    }
    return map;
  }, [items]);

  return (
    <Select.Root
      value={value !== undefined ? String(value) : ""}
      onValueChange={(value: string) => {
        const real = stringToValueMap.get(value);
        if (real !== undefined) onChange?.(real);
      }}
    >
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
