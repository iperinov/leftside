import { Checkbox, Flex, Text } from "@radix-ui/themes";
import type ItemData from "~/types/ItemData";
import styles from "./MultiSelectDropdown.module.css";

interface MultiSelectDropdownItemProps<T extends string | number> {
  items: ItemData<T>[];
  selectedIDs: T[];
  onSelect: (selected: boolean, id: T) => void;
}

export default function MultiSelectDropdownItem<T extends string | number>({ ...props }) {
  const { data, index, style } = props;
  const { items, selectedIDs, onSelect } = data as  MultiSelectDropdownItemProps<T> ;
  
  return (
    <Text as="label" size="2" style={style} className={`${styles.multiSelectDropdownItem} noselect`}>
      <Flex gap="2">
        <Checkbox
          checked={selectedIDs.includes(items[index].id)}
          onCheckedChange={(checked) => {
            onSelect(!!checked, items[index].id);
          }}
        />
        {items[index].name}
      </Flex>
    </Text>
  );
}
