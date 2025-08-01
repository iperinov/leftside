import { Flex } from "@radix-ui/themes";
import { Pill } from "../pill/Pill";
import type { ResultsSelectionProps } from "./MultiSelectDropdown";

export default function PillsSelections<T extends string | number>({ selectedIDs, items, onSelectionChange }: ResultsSelectionProps<T>) {
  return (
    <Flex gap="2">
      {selectedIDs.map((id) => {
        const item = items.find((s) => s.id === id);
        if (!item) return null;
        return <Pill key={id} text={item.name || ""} onClose={() => onSelectionChange?.(selectedIDs.filter((s) => s !== id))} />;
      })}
    </Flex>
  );
}
