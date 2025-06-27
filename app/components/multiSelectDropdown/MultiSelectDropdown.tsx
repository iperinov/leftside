import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import MultiSelectDropdownList from "./MultiSelectDropdownItemList";
import useRectOfElement from "~/hooks/common/useRectOfElement";
import type ItemData from "../../common/IdAndLabelData";
import PillsSelections from "./PillsSelections";
import "./MultiSelectDropdown.css";

export interface ResultsSelectionProps {
  selectedIDs: string[];
  items: ItemData[];
  onSelectionChange?: (selectedIDs: string[]) => void;
}
interface MultiSelectDropdownProps {
  items?: ItemData[];
  selectedIDs?: string[];
  onSelectionChange?: (selectedIDs: string[]) => void;
  ResultsPanel?: (props: ResultsSelectionProps) => React.ReactNode;
}

export default function MultiSelectDropdown({
  items = [],
  selectedIDs = [],
  onSelectionChange,
  ResultsPanel = PillsSelections,
}: MultiSelectDropdownProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);

  const filteredItems =
    searchValue.length === 0
      ? items
      : items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
  const preventShowingDropdownList = filteredItems.length === 0;

  const onAddItemClicked = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen((prev) => !prev);
  }, [open]) ;

  const onSelect = useCallback((selected: boolean, id: string) => {
    onSelectionChange?.(selected ? [...selectedIDs, id] : selectedIDs.filter((s) => s !== id));
  }, [selectedIDs]);

  useEffect(() => {
    if (!open && filteredItems.length > 0 && searchValue.length > 0) {
      setOpen(filteredItems.length > 0);
    }
  }, [open, searchValue]);

  return (
    <Box as="div" className="multiSelectDropdown" ref={triggerRef}>
      <Flex gap="2" align="center" justify="between">
        {/* Selected results */}
        <TextField.Root
          disabled={items.length === 0}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="multiSelectDropdownTextField"
        >
          <TextField.Slot className="multiSelectDropdownTextFieldSlot">
            <ResultsPanel selectedIDs={selectedIDs} items={items} onSelectionChange={onSelectionChange} />
          </TextField.Slot>
          <TextField.Slot>
            <Button disabled={preventShowingDropdownList} variant="ghost" onClick={onAddItemClicked} className="nohover">
              <PlusIcon />
            </Button>
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      {/* Dropdown List */}
      {!preventShowingDropdownList && (
        <MultiSelectDropdownList
          open={open}
          onOpenChange={(opened) => {
            setOpen(opened);
            setSearchValue("");
          }}
          items={filteredItems}
          selectedIDs={selectedIDs}
          onSelect={onSelect}
          triggerRef={triggerRef}
        />
      )}
    </Box>
  );
}
