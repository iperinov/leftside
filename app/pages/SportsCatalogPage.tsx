
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import MultiSelectDropdown from "~/components/multiSelectDropdown/MultiSelectDropdown";

const sports = [
  { id: "football", name: "Football" },
  { id: "basketball", name: "Basketball" },
  { id: "tennis", name: "Tennis" },
  { id: "cricket", name: "Cricket" },
  { id: "rugby", name: "Rugby" },
  { id: "hockey", name: "Hockey" },
  { id: "baseball", name: "Baseball" },
  { id: "golf", name: "Golf" },
  { id: "volleyball", name: "Volleyball" },
  { id: "swimming", name: "Swimming" },
  { id: "badminton", name: "Badminton" },
  { id: "table-tennis", name: "Table Tennis" },
  { id: "boxing", name: "Boxing" },
  { id: "wrestling", name: "Wrestling" },
  { id: "cycling", name: "Cycling" },
];

export default function SportsCatalogPage() {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  return (
    <Flex direction="column" gap="4" p="4" width="400px">
      <MultiSelectDropdown items={sports} selectedIDs={selectedSports} onSelectionChange={setSelectedSports} />
    </Flex>
  )
}
