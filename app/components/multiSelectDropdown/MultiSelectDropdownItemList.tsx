import { useControlledComponentClickOutside } from "~/hooks/common/useControlledComponnetClickOutside";
import type { ControlledComponentProps } from "../shared/ControlledComponent";
import { useRef } from "react";
import { Flex } from "@radix-ui/themes";
import type MultiSelectDropdownItemData from "./MultiSelectDropdownItemData";
import MultiSelectDropdownItem from "./MultiSelectDropdownItem";

interface MultiSelectDropdownItemListProps {
  items: MultiSelectDropdownItemData[];
  selectedIDs: string[];
  onSelect: (selected: boolean, id: string) => void;
}

export default function MultiSelectDropdownItemList({
  open = false,
  onOpenChange = (open: boolean) => {},
  items,
  selectedIDs,
  onSelect,
}: MultiSelectDropdownItemListProps & ControlledComponentProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useControlledComponentClickOutside(panelRef, open, onOpenChange);

  return (
    <>
      {open && (
        <Flex ref={panelRef} direction="column" gap="2" overflow="auto" maxHeight="400px" className="popUpList" p="3">
          {items.map((item) => (
            <MultiSelectDropdownItem key={item.id} item={item} isSelected={selectedIDs.includes(item.id)} onSelect={onSelect} />
          ))}
        </Flex>
      )}
    </>
  );
}