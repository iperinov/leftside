import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import ConfigurationContent from "~/components/categories/ConfigurationContent";
import ConfigurationFooter from "~/components/categories/ConfigurationFooter";
import ConfigurationHeader from "~/components/categories/ConfigurationHeader";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import { useCategories } from "~/hooks/configurationCategories/useCategories";
import styles from "./ModifyConfigurationPage.module.css";

interface ModifyConfigurationPageProps {
  id: string;
  name: string;
  edit: boolean;
}

export default function ModifyConfigurationPage({
  id,
  name,
  edit,
}: ModifyConfigurationPageProps) {
  const { error, isLoading } = useCategories(id);
  const [selectedID, setSelectedID] = useState<string>("");

  return (
    <LoadDataDecorator error={error} isLoading={isLoading}>
      <Flex direction="column" className={styles.page}>
        <ConfigurationHeader
          name={name}
          edit={edit}
          className={styles.header}
        />
        <ConfigurationContent
          selectedID={selectedID}
          setSelectedID={setSelectedID}
          className={styles.content}
        />
        <ConfigurationFooter
          onCanceled={() =>
            console.log("Modigy configuration ", name, " canceled")
          } // TODO
          onCompleted={() =>
            console.log("Modigy configuration ", name, " completed")
          } //TODO
          className={styles.footer}
        />
      </Flex>
    </LoadDataDecorator>
  );
}
