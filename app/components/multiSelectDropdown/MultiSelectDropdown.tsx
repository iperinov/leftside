import { PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import { useCallback, useEffect, useRef, useState } from "react";
import MultiSelectDropdownItemList from "./MultiSelectDropdownItemList";
import PillsSelections from "./PillsSelections";
import "./MultiSelectDropdown.css";
import type ItemData from "~/common/ItemData";

export interface ResultsSelectionProps<T extends string | number> {
  selectedIDs: T[];
  items: ItemData<T>[];
  onSelectionChange?: (selectedIDs: T[]) => void;
}
interface MultiSelectDropdownProps<T extends string | number> {
  items?: ItemData<T>[];
  selectedIDs?: T[];
  onSelectionChange?: (selectedIDs: T[]) => void;
  ResultsPanel?: (props: ResultsSelectionProps<T>) => React.ReactNode;
}

export default function MultiSelectDropdown<T extends string | number>({
  items = [],
  selectedIDs = [],
  onSelectionChange,
  ResultsPanel = PillsSelections,
}: MultiSelectDropdownProps<T>) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);

  const filteredItems =
    searchValue.length === 0
      ? items
      : items.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()),
        );
  const preventShowingDropdownList = filteredItems.length === 0;

  const onAddItemClicked = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setOpen((prev) => !prev);
    },
    [],
  );

  const onSelect = useCallback(
    (selected: boolean, id: T) => {
      onSelectionChange?.(
        selected ? [...selectedIDs, id] : selectedIDs.filter((s) => s !== id),
      );
    },
    [selectedIDs, onSelectionChange],
  );

  useEffect(() => {
    if (!open && filteredItems.length > 0 && searchValue.length > 0) {
      setOpen(filteredItems.length > 0);
    }
  }, [open, searchValue, filteredItems]);

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
            <ResultsPanel
              selectedIDs={selectedIDs}
              items={items}
              onSelectionChange={onSelectionChange}
            />
          </TextField.Slot>
          <TextField.Slot>
            <Button
              disabled={preventShowingDropdownList}
              variant="ghost"
              onClick={onAddItemClicked}
              className="nohover"
            >
              <PlusIcon />
            </Button>
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      {/* Dropdown List */}
      {!preventShowingDropdownList && (
        <MultiSelectDropdownItemList<T>
          open={open}
          onOpenChange={(opened: boolean) => {
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
