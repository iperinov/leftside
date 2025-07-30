import { Flex, Popover } from "@radix-ui/themes";
import { useState } from "react";
import { sportIconsConfig } from "~/lib/sportIconsConfig";
import SportAwesomeIcon, { DefaultSportAwesomeIcon } from "../SportAwesomeIcon";
import styles from "./AwesomeIconSelect.module.css";

interface AwesomeIconSelectProps {
  selectedID?: string;
  onSelect?: (iconName: string) => void;
}

export default function AwesomeIconSelect({ selectedID, onSelect }: AwesomeIconSelectProps) {
  const [open, setOpen] = useState(false);
  const iconSize = 3;

  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal={true}>
      <Popover.Trigger>
        <span>
          {selectedID ? (
            <SportAwesomeIcon sportIcon={selectedID} size={iconSize} hint={sportIconsConfig?.getSportFor(selectedID || "")} />
          ) : (
            <DefaultSportAwesomeIcon size={iconSize} />
          )}
        </span>
      </Popover.Trigger>
      <Popover.Content className={styles.iconContent} maxWidth="300px" sideOffset={5} align="start">
        <Flex gap="2" wrap="wrap" justify="between">
          {sportIconsConfig?.availableIcons.map((icon) => (
            <SportAwesomeIcon
              sportIcon={icon}
              key={icon}
              size={iconSize}
              className={`${styles.icon}`}
              onClick={() => {
                onSelect?.(icon);
                setOpen(false);
              }}
              selected={selectedID === icon}
              hint={sportIconsConfig?.getSportFor(icon)}
            />
          ))}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
