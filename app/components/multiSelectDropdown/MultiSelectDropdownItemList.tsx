import { Box, Flex } from "@radix-ui/themes";
import { useLayoutEffect, useRef, useState } from "react";
import { FixedSizeList } from "react-window";
import useControlledComponentClickOutside from "~/hooks/common/useControlledComponnetClickOutside";
import type ItemData from "~/types/ItemData";
import type { ControlledComponentProps } from "../shared/ControlledComponent";
import styles from "./MultiSelectDropdown.module.css";
import MultiSelectDropdownItem from "./MultiSelectDropdownItem";
import useRectOfElement, { useRectWithObserver } from "~/hooks/common/useRectOfElement";

export interface MultiSelectDropdownItemListProps<T extends string | number> {
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
  const [rectOfTrigger, setRectOfTrigger] = useState<DOMRect | null>(null);
  useControlledComponentClickOutside(itemsListRef, open, onOpenChange);

  useLayoutEffect(() => {
  if (open && triggerRef.current) {
    setRectOfTrigger(triggerRef.current.getBoundingClientRect());
  }
}, [open, triggerRef]);

  // Position dropdown after open and refs are available
  useLayoutEffect(() => {
    if (!open || !itemsListRef.current || !rectOfTrigger) return;

    requestAnimationFrame(() => {
      const dropdown = itemsListRef.current;
      if (!dropdown || !rectOfTrigger) return; 
      const rectOfList = dropdown.getBoundingClientRect();
      if (rectOfList.width === 0 || rectOfList.height === 0) return;

      positionItemsList(rectOfTrigger, rectOfList, itemsListRef, positionPreference);
    });
  }, [open, rectOfTrigger, positionPreference]);


  return (
    <>
      {open && (
        <Flex direction="column" ref={itemsListRef} px="3" py="2" className={styles.multiSelectDropdownItemList}>
          <FixedSizeList
            style={{ overflowX: "hidden" }}
            height={400}
            itemCount={items.length}
            itemSize={35}
            itemData={{ items, selectedIDs, onSelect }}
            width={"100%"}
            itemKey={(index, data) => data.items[index].id}
          >
            {MultiSelectDropdownItem<T>}
          </FixedSizeList>
        </Flex>
      )}
    </>
  );
}

function positionItemsList(
  rectOfTrigger: DOMRect,
  rectOfItemsList: DOMRect,
  itemsListRef: React.RefObject<HTMLDivElement | null>,
  positionPreference: "above" | "below"
) {
  if (!itemsListRef.current || rectOfItemsList.width === 0 || rectOfItemsList.height === 0) {
    console.log("MultiSelectDropdownItemList: items list is not ready yet", !itemsListRef.current, rectOfItemsList.width, rectOfItemsList.height);
    return;
  } else {
    console.log("MultiSelectDropdownItemList: positioning items list", rectOfTrigger, rectOfItemsList);
  }

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
