import { Text } from "@radix-ui/themes";
import type { ResultsSelectionProps } from "./MultiSelectDropdown";

export default function TextSelections({ selectedIDs }: ResultsSelectionProps) {
  return <Text>{`${selectedIDs.length} selected`}</Text>;
}
