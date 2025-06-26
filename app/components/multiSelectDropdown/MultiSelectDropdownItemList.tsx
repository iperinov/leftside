import { useControlledComponentClickOutside } from "~/hooks/common/useControlledComponnetClickOutside";
import type { ControlledComponentProps } from "../shared/ControlledComponent";
import { useLayoutEffect, useRef, useState } from "react";
import { Flex } from "@radix-ui/themes";
import type MultiSelectDropdownItemData from "../../common/IdAndLabelData";
import MultiSelectDropdownItem from "./MultiSelectDropdownItem";
import { Portal } from "radix-ui";
import usePositionUnderElement from "~/hooks/common/usePositionUnderElelement";

interface MultiSelectDropdownItemListProps {
  items: MultiSelectDropdownItemData[];
  selectedIDs: string[];
  onSelect: (selected: boolean, id: string) => void;
  showOnPosition?: { top: number; left: number };
}

export default function MultiSelectDropdownItemList({
  open = false,
  onOpenChange = (open: boolean) => {},
  items,
  selectedIDs,
  onSelect,
  showOnPosition,
}: MultiSelectDropdownItemListProps & ControlledComponentProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useControlledComponentClickOutside(panelRef, open, onOpenChange);

  if (panelRef && showOnPosition && panelRef.current) {
    panelRef.current.style.setProperty("top", `${showOnPosition.top}px`);
    panelRef.current.style.setProperty("left", `${showOnPosition.left}px`);
  }

  return (
    <>
      {open && (
        <Flex ref={panelRef} direction="column" gap="2" p="3" overflow="auto" className="popUpList">
          {items.map((item) => (
            <MultiSelectDropdownItem key={item.id} item={item} isSelected={selectedIDs.includes(item.id)} onSelect={onSelect} />
          ))}
        </Flex>
      )}
    </>
  );
}
