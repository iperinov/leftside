import { Text } from "@radix-ui/themes";
import type { ResultsSelectionProps } from "./MultiSelectDropdown";

export default function TextSelections<T extends string | number>({
  selectedIDs,
}: ResultsSelectionProps<T>) {
  return <Text>{`${selectedIDs.length} selected`}</Text>;
}
