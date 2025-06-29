import { Checkbox, Flex, Text } from "@radix-ui/themes";
import "./MultiSelectDropdown.css";
import type ItemData from "~/components/categories/ItemData";

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
    <Text as="label" size="2" className="noselect multiSelectDropdownItem">
      <Flex gap="2">
        <Checkbox
          defaultChecked={isSelected}
          onCheckedChange={(checked) => onSelect(!!checked, item.id)}
        />
        {item.name}
      </Flex>
    </Text>
  );
}
