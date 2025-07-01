import { Flex } from "@radix-ui/themes";
import type ClassNameProps from "../shared/ClassNameProps";
import styles from "./ConfigurationContent.module.css";
import ConfigurationContentContext from "./ConfigurationContentContext";
import ConfigurationContentMain from "./ConfigurationContentMain";
import ConfigurationContentSidebar from "./ConfigurationContentSidebar";

interface ConfigurationContentProps {
  selectedID: string;
  setSelectedID: (id: string) => void;
}

export default function ConfigurationContent({
  className,
  selectedID,
  setSelectedID,
}: ConfigurationContentProps & ClassNameProps) {
  return (
    <Flex direction="row" className={className}>
      <ConfigurationContentSidebar
        className={styles.sideBar}
        selectedID={selectedID}
        onSelected={(item) =>
          setSelectedID(selectedID === item.id ? "" : item.id)
        }
      />

      <ConfigurationContentMain
        categoryID={selectedID}
        className={styles.main}
      />

      <ConfigurationContentContext className={styles.context} />
    </Flex>
  );
}
