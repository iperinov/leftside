import { Text, Checkbox, Flex } from "@radix-ui/themes";
import type MultiSelectDropdownItemData from "./MultiSelectDropdownItemData";

interface MultiSelectDropdownItemProps {
  item: MultiSelectDropdownItemData;
  isSelected: boolean;
  onSelect: (selected: boolean, id: string) => void;
}

export default function MultiSelectDropdownItem({ item, isSelected, onSelect }: MultiSelectDropdownItemProps) {
  return (
    <Text as="label" size="2" className="noselect">
      <Flex gap="2">
        <Checkbox defaultChecked={isSelected} onCheckedChange={(checked) => onSelect(!!checked, item.id)} />
        {item.label}
      </Flex>
    </Text>
  );
}