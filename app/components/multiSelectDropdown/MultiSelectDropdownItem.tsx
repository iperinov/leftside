import { Checkbox, Flex, Text } from "@radix-ui/themes";
import "./MultiSelectDropdown.css";
import type ItemData from "~/common/IdAndLabelData";

interface MultiSelectDropdownItemProps {
  item: ItemData;
  isSelected: boolean;
  onSelect: (selected: boolean, id: string) => void;
}

export default function MultiSelectDropdownItem({
  item,
  isSelected,
  onSelect,
}: MultiSelectDropdownItemProps) {
  return (
    <Text as="label" size="2" className="noselect multiSelectDropdownItem">
      <Flex gap="2">
        <Checkbox
          defaultChecked={isSelected}
          onCheckedChange={(checked) => onSelect(!!checked, item.uuid)}
        />
        {item.name}
      </Flex>
    </Text>
  );
}
