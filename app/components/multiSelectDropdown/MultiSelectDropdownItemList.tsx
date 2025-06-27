import { useControlledComponentClickOutside } from "~/hooks/common/useControlledComponnetClickOutside";
import type { ControlledComponentProps } from "../shared/ControlledComponent";
import { useRef } from "react";
import { Flex } from "@radix-ui/themes";
import type MultiSelectDropdownItemData from "../../common/IdAndLabelData";
import MultiSelectDropdownItem from "./MultiSelectDropdownItem";
import useRectOfElement from "~/hooks/common/useRectOfElement";

interface MultiSelectDropdownItemListProps {
  items: MultiSelectDropdownItemData[];
  selectedIDs: string[];
  onSelect: (selected: boolean, id: string) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

function positionItemsList(rectOfTrigger: DOMRect, rectOfItemsList: DOMRect, itemsListRef: React.RefObject<HTMLDivElement | null>) {
    if (!itemsListRef.current) return;  

    const offset = 3; // px
    const availableHeightBelowTrigger = window.innerHeight - rectOfTrigger.bottom;
    const availableHeightAboveTrigger = rectOfTrigger.top - offset;
    const canPositionBelowTrigger = availableHeightBelowTrigger + offset >= rectOfItemsList.height;
    const canPositionAboveTrigger = availableHeightAboveTrigger + offset >= rectOfItemsList.height;
     
    console.log("Available height below trigger: ", availableHeightBelowTrigger, availableHeightAboveTrigger, canPositionBelowTrigger, canPositionAboveTrigger);

    switch(true) {
      case canPositionBelowTrigger: 
        itemsListRef.current.style.setProperty("top", `${rectOfTrigger.bottom + window.scrollY + offset}px`);
        break;
      case canPositionAboveTrigger:
        itemsListRef.current.style.setProperty("top", `${rectOfTrigger.top - rectOfItemsList.height + window.scrollY - offset}px`);
        break;
      case availableHeightBelowTrigger >= availableHeightAboveTrigger:
        itemsListRef.current.style.setProperty("top", `${rectOfTrigger.bottom + window.scrollY + offset}px`);
        itemsListRef.current.style.setProperty("height", `${availableHeightBelowTrigger - offset}px`);
        break;
      default:
        itemsListRef.current.style.setProperty("top", `${rectOfTrigger.top - rectOfItemsList.height + window.scrollY - offset}px`);
        itemsListRef.current.style.setProperty("height", `${availableHeightAboveTrigger - offset}px`);
    }

    itemsListRef.current.style.setProperty("left", `${rectOfTrigger.left + window.scrollX}px`);
    itemsListRef.current.style.setProperty("width", `${rectOfTrigger.width}px`);
}

export default function MultiSelectDropdownItemList({
  open = false,
  onOpenChange = (open: boolean) => {},
  items,
  selectedIDs,
  onSelect,
  triggerRef,
}: MultiSelectDropdownItemListProps & ControlledComponentProps) {
  const itemsListRef = useRef<HTMLDivElement>(null);
  const rectOfTrigger = useRectOfElement(triggerRef, [open]);
  const rectOfItemsList = useRectOfElement(itemsListRef, [open]);
  useControlledComponentClickOutside(itemsListRef, open, onOpenChange);

  if (itemsListRef && itemsListRef.current && rectOfTrigger && rectOfItemsList) {
    positionItemsList(rectOfTrigger, rectOfItemsList, itemsListRef);
  }

  return (
    <>
      {open && (
        <Flex ref={itemsListRef} direction="column" px="3" py="2" overflow="auto" className="multiSelectDropdownItemList">
          {items.map((item) => (
            <MultiSelectDropdownItem key={item.id} item={item} isSelected={selectedIDs.includes(item.id)} onSelect={onSelect} />
          ))}
        </Flex>
      )}
    </>
  );
}
