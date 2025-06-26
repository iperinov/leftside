import type { ResultsSelectionProps } from "./MultiSelectDropdown";
import { Text } from "@radix-ui/themes";

export default function TextSelections({ selectedIDs }: ResultsSelectionProps) {
  return (
    <Text>{`${selectedIDs.length} selected`}</Text>
  );
}
