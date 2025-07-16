import { Flex } from "@radix-ui/themes";
import type ClassNameProps from "../shared/ClassNameProps";
import styles from "./ConfigurationContent.module.css";
import ConfigurationContentContext from "./ConfigurationContentContext";
import ConfigurationContentMain from "./ConfigurationContentMain";
import ConfigurationContentSidebar from "./ConfigurationContentSidebar";

interface ConfigurationContentProps {
  selectedUUID: string;
  setSelectedID: (id: string) => void;
}

export default function ConfigurationContent({ className, selectedUUID, setSelectedID }: ConfigurationContentProps & ClassNameProps) {
  return (
    <Flex direction="row" className={className}>
      <ConfigurationContentSidebar
        className={styles.sideBar}
        selectedUUID={selectedUUID}
        onSelected={(item) => setSelectedID(selectedUUID === item.id ? "" : item.id)}
      />

      <ConfigurationContentMain categoryUUID={selectedUUID} className={styles.main} />

      <ConfigurationContentContext categoryID={selectedUUID} className={styles.context} />
    </Flex>
  );
}
