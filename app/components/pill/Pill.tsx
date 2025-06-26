import { Cross1Icon, Cross2Icon, CrossCircledIcon } from "@radix-ui/react-icons";
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
        <Button onClick={(e) => {e.stopPropagation(); onClose();}} variant="ghost" radius="full" className={`${styles.closeButton}`}>
          <Cross2Icon />
        </Button>
      )}
    </Flex>
  );
}