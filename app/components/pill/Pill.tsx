import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import styles from "./Pill.module.css";

interface PillProps {
  text: string;
  onClose?: () => void;
}

export function Pill({ text, onClose }: PillProps) {
  return (
    <Flex align="center" gap="1" px="2" my="1" className={styles.pill}>
      <Text>{text}</Text>
      {onClose && (
        <Button
          onClick={onClose}
          variant="ghost"
          radius="full"
          className={`${styles.closeButton} nohover`}
        >
          <Cross2Icon />
        </Button>
      )}
    </Flex>
  );
}
