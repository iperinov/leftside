import { useControlledComponentClickOutside } from "~/hooks/common/useControlledComponnetClickOutside";
import type { ControlledComponentProps } from "../shared/ControlledComponent";
import { useLayoutEffect, useRef, useState } from "react";
import { Flex } from "@radix-ui/themes";
import type MultiSelectDropdownItemData from "../../common/ItemData";
import MultiSelectDropdownItem from "./MultiSelectDropdownItem";
import { Portal } from "radix-ui";
import usePositionUnderElement from "~/hooks/common/usePositionUnderElelement";

interface MultiSelectDropdownItemListProps {
  items: MultiSelectDropdownItemData[];
  selectedIDs: string[];
  onSelect: (selected: boolean, id: string) => void;
  position?: { top: number; left: number };
}

export default function MultiSelectDropdownItemList({
  open = false,
  onOpenChange = (open: boolean) => {},
  items,
  selectedIDs,
  onSelect,
  position,
}: MultiSelectDropdownItemListProps & ControlledComponentProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useControlledComponentClickOutside(panelRef, open, onOpenChange);
  if (panelRef && position) {
    panelRef.current?.style.setProperty("position", "fixed");
    panelRef.current?.style.setProperty("top", `${position.top}px`);
    panelRef.current?.style.setProperty("left", `${position.left}px`);
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
