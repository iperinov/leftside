import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import MultiSelectDropdownList from "./MultiSelectDropdownItemList";
import usePositionToElement from "~/hooks/common/usePositionUnderElelement";
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

export default function MultiSelectDropdown({ items = [], selectedIDs = [], onSelectionChange, ResultsPanel = PillsSelections }: MultiSelectDropdownProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const position = usePositionToElement(triggerRef, [open]);

  const filteredItems =
    searchValue.length === 0
      ? items
      : items.filter((item) => !selectedIDs.includes(item.id) && item.name.toLowerCase().includes(searchValue.toLowerCase()));
  const preventShowingDropdownList = filteredItems.length === 0;

  useEffect(() => {
    if (!open && filteredItems.length > 0 && searchValue.length > 0) {
      setOpen(filteredItems.length > 0);
    }
  }, [searchValue]);

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen((prev) => !prev);
  };

  return (
    <Box as="div" className="multiSelectDropdown" ref={triggerRef}>
      <Flex gap="2" align="center" justify="between">
        {/* Selected results */}
        <TextField.Root disabled={items.length === 0} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="multiSelectDropdownTextField">
          <TextField.Slot className="multiSelectDropdownTextFieldSlot">
            <ResultsPanel selectedIDs={selectedIDs} items={items} onSelectionChange={onSelectionChange} />
          </TextField.Slot>
          <TextField.Slot>
            <Button disabled={preventShowingDropdownList} variant="ghost" onClick={onButtonClick}>
              <PlusIcon />
            </Button>
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      {/* Dropdown List */}
      {!preventShowingDropdownList && (
        <MultiSelectDropdownList
          open={open}
          onOpenChange={(opened) => {setOpen(opened); setSearchValue("");}}
          items={filteredItems}
          selectedIDs={selectedIDs}
          onSelect={(selected, id) => onSelectionChange?.(selected ? [...selectedIDs, id] : selectedIDs.filter((s) => s !== id))}
          showOnPosition={position}
        />
      )}
    </Box>
  );
}
