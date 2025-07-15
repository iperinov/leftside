import { Avatar, Button, Flex, Grid, Popover } from "@radix-ui/themes";
import type ItemData from "~/types/ItemData";
import styles from "./AwesomeIconSelect.module.css";
import { sportInfo } from "~/api/general/sport-info-uuid.service";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import { isClassAvailable } from "~/utils/isClassAvailable";

interface AwesomeIconSelectProps {
  sports: ItemData<string>[];
  selectedID?: string;
  fallbackIconID?: string;
  onSelect?: (iconID: string) => void;
}

export default function AwesomeIconSelect({ sports, selectedID, fallbackIconID = "image", onSelect }: AwesomeIconSelectProps) {
  const [open, setOpen] = useState(false);

  const iconClassStyles = "fa-solid fa-3x";
  const fallbackAwesomeIconClass = `${iconClassStyles} fa-${fallbackIconID}`;
  const getAwesomeIconClass = (sportUUID: string): string | undefined => {
    const iconClass = `${iconClassStyles} fa-${sportInfo.getShortDescription(sportUUID)}`;
    return isClassAvailable(iconClass) ? iconClass : undefined;
  };
  const availableIconClasses = [...sports.flatMap((sport) => {
    const iconClassForSport = getAwesomeIconClass(sport.id);
    return iconClassForSport && isClassAvailable(iconClassForSport) ? {id: sport.id, value: iconClassForSport} : [];
  }), {id: "", value: fallbackAwesomeIconClass}];
  const columns = availableIconClasses.length > 4 ? 4 : availableIconClasses.length;
  const rows = availableIconClasses.length > 4 ? Math.ceil(availableIconClasses.length / 4) : 1;

  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal={true}>
      <Popover.Trigger>
        <i className={`${styles.iconTrigger} ${selectedID ? getAwesomeIconClass(selectedID) || fallbackAwesomeIconClass : fallbackAwesomeIconClass}`} />
      </Popover.Trigger>
      <Popover.Content className={styles.iconContent} maxWidth="300px" sideOffset={5} align="start">
        <Flex gap="2" wrap="wrap" justify="between">
          {availableIconClasses.map((iconClass) => (
            <i
              key={iconClass.id}
              className={`${styles.icon} ${iconClass.value}`}
              onClick={() => {
                onSelect?.(iconClass.id);
                setOpen(false);
              }}
              data-selected={selectedID === iconClass.id ? "true" : undefined}
            />
          ))}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
