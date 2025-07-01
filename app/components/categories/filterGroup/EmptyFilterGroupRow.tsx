import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import styles from "../filters/Filters.module.css";

interface EmptyFilterGroupRowProps {
  text: string;
}

export default function EmptyFilterGroupRow({
  text,
}: EmptyFilterGroupRowProps) {
  return (
    <Flex direction="column" px="2">
      <Flex
        px="5"
        gap="2"
        align="center"
        justify="start"
        wrap="nowrap"
        minHeight={"100px"}
        className={`${styles.filterGroupRow} ${styles.filtersGroup} ${styles.emptyFiltersGroupRow}`}
      >
        <InfoCircledIcon
          width="1.2rem"
          height="1.2rem"
          style={{ marginLeft: "1rem", flex: "1" }}
        />
        <Text style={{ flex: "9" }}>{text}</Text>
      </Flex>
    </Flex>
  );
}
