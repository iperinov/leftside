import { useEffect, useState } from "react";
import { Pill } from "../pill/Pill";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import "./MultiSelectDropdown.css";
import MultiSelectDropdownList from "./MultiSelectDropdownItemList";
import type MultiSelectDropdownItemData from "./MultiSelectDropdownItemData";

interface MultiSelectDropdownProps {
  items?: MultiSelectDropdownItemData[];
}

export default function MultiSelectDropdown({ items = [] }: MultiSelectDropdownProps) {
  const [selectedIDs, setselectedIDs] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const filteredItems =
    searchValue.length === 0
      ? items
      : items.filter((item) => !selectedIDs.includes(item.id) && item.label.toLowerCase().includes(searchValue.toLowerCase()));
  const preventShowingDropdownList = filteredItems.length === 0;

  useEffect(() => {
    if (!open && filteredItems.length > 0 && searchValue.length > 0) {
      setOpen(filteredItems.length > 0);
    }
  }, [searchValue]);

  return (
    <Box as="div" className="multiSelectDropdown">
      <Flex gap="2" align="center" justify="between">
        {/* Selected results */}
        <TextField.Root value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="multiSelectDropdownTextField">
          <TextField.Slot className="multiSelectDropdownTextFieldSlot">
            <Flex gap="2">
              {selectedIDs.map((id) => {
                const sport = items.find((s) => s.id === id);
                if (!sport) return null;
                return <Pill key={id} text={sport.label || ""} onClose={() => setselectedIDs((prev) => prev.filter((s) => s !== id))} />;
              })}
            </Flex>
          </TextField.Slot>
          <TextField.Slot>
            <Button disabled={preventShowingDropdownList} variant="ghost" onMouseDown={(event) => setOpen((prev) => !prev)}>
              <PlusIcon />
            </Button>
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      {/* Dropdown List */}
      {!preventShowingDropdownList && (
        <MultiSelectDropdownList
          open={open}
          onOpenChange={(opened) => setOpen(opened)}
          items={filteredItems}
          selectedIDs={selectedIDs}
          onSelect={(selected, id) => setselectedIDs(selected ? [...selectedIDs, id] : selectedIDs.filter((s) => s !== id))}
        />
      )}
    </Box>
  );
}
