import { Checkbox, Flex, Text } from "@radix-ui/themes";
import type ItemData from "~/types/ItemData";
import styles from "./MultiSelectDropdown.module.css";

interface MultiSelectDropdownItemProps<T extends string | number> {
  item: ItemData<T>;
  isSelected: boolean;
  onSelect: (selected: boolean, id: T) => void;
}

export default function MultiSelectDropdownItem<T extends string | number>({
  item,
  isSelected,
  onSelect,
}: MultiSelectDropdownItemProps<T>) {
  return (
    <Text
      as="label"
      size="2"
      className={`${styles.multiSelectDropdownItem} noselect`}
    >
      <Flex gap="2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelect(!!checked, item.id)}
        />
        {item.name}
      </Flex>
    </Text>
  );
}
