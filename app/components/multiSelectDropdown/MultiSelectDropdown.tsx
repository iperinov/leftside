import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Pill } from "../pill/Pill";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import "./MultiSelectDropdown.css";
import MultiSelectDropdownList from "./MultiSelectDropdownItemList";
import type MultiSelectDropdownItemData from "../../common/ItemData";
import usePositionUnderElement from "~/hooks/common/usePositionUnderElelement";

interface MultiSelectDropdownProps {
  items?: MultiSelectDropdownItemData[];
  selectedIDs?: string[];
  onSelectionChange?: (selectedIDs: string[]) => void;
}

interface Position {
    top: number;
    left: number;
}

export default function MultiSelectDropdown({ items = [], selectedIDs = [], onSelectionChange }: MultiSelectDropdownProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>();
  const filteredItems =
    searchValue.length === 0
      ? items
      : items.filter((item) => !selectedIDs.includes(item.id) && item.name.toLowerCase().includes(searchValue.toLowerCase()));
  const preventShowingDropdownList = filteredItems.length === 0;

  useLayoutEffect(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      console.log("useEffect called for ref ", { top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [open]);

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
        <TextField.Root value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="multiSelectDropdownTextField">
          <TextField.Slot className="multiSelectDropdownTextFieldSlot">
            <Flex gap="2">
              {selectedIDs.map((id) => {
                const item = items.find((s) => s.id === id);
                if (!item) return null;
                return <Pill key={id} text={item.name || ""} onClose={() => onSelectionChange?.(selectedIDs.filter((s) => s !== id))} />;
              })}
            </Flex>
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
          onOpenChange={(opened) => {
            setOpen(opened);
            setSearchValue("");
            console.log("open changed", opened, searchValue);
          }}
          items={filteredItems}
          selectedIDs={selectedIDs}
          onSelect={(selected, id) => onSelectionChange?.(selected ? [...selectedIDs, id] : selectedIDs.filter((s) => s !== id))}
          position={position}
        />
      )}
    </Box>
  );
}
