import { Button, Flex, Popover } from "@radix-ui/themes";
import type ItemData from "~/types/ItemData";
import styles from "./AwesomeIconSelect.module.css";
import { useState } from "react";
import { isClassAvailable } from "~/utils/isClassAvailable";
import AwesomeIcon, { awesomeIconClassStyles, DefaultAwesomeIcon, getAwesomeIconClassForSport } from "../AwesomeIcon";

interface AwesomeIconSelectProps {
  sports: ItemData<string>[];
  selectedID?: string;
  fallbackIconID?: string;
  onSelect?: (iconID: string) => void;
}

export default function AwesomeIconSelect({ sports, selectedID, fallbackIconID = "fa-sportsgeneric", onSelect }: AwesomeIconSelectProps) {
  const [open, setOpen] = useState(false);
  const iconSize = "3";
  const fallbackAwesomeIconClass = `${awesomeIconClassStyles(iconSize)} ${fallbackIconID}`;
  const availableIconClasses = [
    ...sports.flatMap((sport) => {
      const iconClassForSport = getAwesomeIconClassForSport(sport.id, iconSize);
      return iconClassForSport && isClassAvailable(iconClassForSport) ? { id: sport.id, value: iconClassForSport } : [];
    }),
    { id: "", value: fallbackAwesomeIconClass },
  ];

  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal={true}>
      <Popover.Trigger>
        <span>{selectedID ? <AwesomeIcon sportUUID={selectedID} fallbackAwesomeIconClass={fallbackIconID} size="3" /> : <DefaultAwesomeIcon size="3" />}</span>
      </Popover.Trigger>
      <Popover.Content className={styles.iconContent} maxWidth="300px" sideOffset={5} align="start">
        <Flex gap="2" wrap="wrap" justify="between">
          {availableIconClasses.map((iconClass) => (
            <AwesomeIcon
              sportUUID={iconClass.id}
              key={iconClass.id}
              className={`${styles.icon} ${iconClass.value}`}
              onClick={() => {
                onSelect?.(iconClass.id);
                setOpen(false);
              }}
              selected={selectedID === iconClass.id}
            />
          ))}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
