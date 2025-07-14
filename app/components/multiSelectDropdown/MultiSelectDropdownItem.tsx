import { Box, Checkbox, Flex, Text } from "@radix-ui/themes";
import type ItemData from "~/types/ItemData";
import styles from "./MultiSelectDropdown.module.css";
import { CheckIcon } from "@radix-ui/react-icons";

interface MultiSelectDropdownItemProps<T extends string | number> {
  items: ItemData<T>[];
  showAs?: "checkbox" | "plain" | "checkmark";
  disabled?: boolean;
  selectedIDs: T[];
  onSelect: (selected: boolean, id: T) => void;
}

export default function MultiSelectDropdownItem<T extends string | number>({ ...props }) {
  const { data, index, style } = props;
  const { items, showAs, disabled, selectedIDs, onSelect } = data as MultiSelectDropdownItemProps<T>;
  const isSelected = selectedIDs.includes(items[index].id);

  return (
    <Text
      as="label"
      size="2"
      style={style}
      className={`${styles.multiSelectDropdownItem} noselect`}
      data-selected={isSelected && showAs === "plain" ? "true" : undefined}
    >
      <Flex justify={"between"} about="center">
        <Flex align="center" gap="2">
          <Checkbox
            checked={isSelected}
            disabled={showAs === "checkbox" && !isSelected && disabled}
            onCheckedChange={(checked) => {
              onSelect(!!checked, items[index].id);
            }}
            style={showAs === "checkbox" ? undefined : { display: "none" }}
          />
          {items[index].name}
        </Flex>
        {showAs === "checkmark" && isSelected && <CheckIcon style={{ width: "1.3rem", height: "1.3rem" }} />}
      </Flex>
    </Text>
  );
}
