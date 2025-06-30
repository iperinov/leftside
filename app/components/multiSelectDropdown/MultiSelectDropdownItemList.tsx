import { Flex } from "@radix-ui/themes";
import { useRef } from "react";
import type ItemData from "~/components/categories/ItemData";
import { useControlledComponentClickOutside } from "~/hooks/common/useControlledComponnetClickOutside";
import useRectOfElement from "~/hooks/common/useRectOfElement";
import type { ControlledComponentProps } from "../shared/ControlledComponent";
import MultiSelectDropdownItem from "./MultiSelectDropdownItem";

function positionItemsList(rectOfTrigger: DOMRect, rectOfItemsList: DOMRect, itemsListRef: React.RefObject<HTMLDivElement | null>, positionPreference: "above" | "below") {
  if (!itemsListRef.current) return;

  const offset = 3; // px
  const availableHeightBelowTrigger = window.innerHeight - rectOfTrigger.bottom;
  const availableHeightAboveTrigger = rectOfTrigger.top - offset;
  const canPositionBelowTrigger = availableHeightBelowTrigger + offset >= rectOfItemsList.height;
  const canPositionAboveTrigger = availableHeightAboveTrigger + offset >= rectOfItemsList.height;

  switch (true) {
    case positionPreference === "below" && canPositionBelowTrigger:
      itemsListRef.current.style.setProperty("top", `${rectOfTrigger.bottom + window.scrollY + offset}px`);
      break;
    case positionPreference === "above" && canPositionAboveTrigger:
      itemsListRef.current.style.setProperty("top", `${rectOfTrigger.top - rectOfItemsList.height + window.scrollY - offset}px`);
      break;
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

interface MultiSelectDropdownItemListProps<T extends string | number> {
  items: ItemData<T>[];
  selectedIDs: T[];
  onSelect: (selected: boolean, id: T) => void;
  positionPreference: "above" | "below";
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

export default function MultiSelectDropdownItemList<T extends string | number>({
  open = false,
  onOpenChange = (open: boolean) => {},
  items,
  selectedIDs,
  onSelect,
  positionPreference,
  triggerRef,
}: MultiSelectDropdownItemListProps<T> & ControlledComponentProps) {
  const itemsListRef = useRef<HTMLDivElement>(null);
  const rectOfTrigger = useRectOfElement(triggerRef);
  const rectOfItemsList = useRectOfElement(itemsListRef);
  useControlledComponentClickOutside(itemsListRef, open, onOpenChange);

  if (itemsListRef?.current && rectOfTrigger && rectOfItemsList) {
    positionItemsList(rectOfTrigger, rectOfItemsList, itemsListRef, positionPreference);
  }

  console.log("items  ", selectedIDs.slice(0, 3))


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
