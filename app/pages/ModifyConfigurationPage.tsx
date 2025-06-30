import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import styles from "./ModifyConfigurationPage.module.css";
import { useCategories } from "~/hooks/configurationCategories/useCategories";
import ConfigurationHeader from "~/components/categories/ConfigurationHeader";
import ConfigurationContent from "~/components/categories/ConfigurationContent";
import ConfigurationFooter from "~/components/categories/ConfigurationFooter";

interface ModifyConfigurationPageProps {
  id: string;
  name: string;
  edit: boolean;
}

export default function ModifyConfigurationPage({ id, name, edit }: ModifyConfigurationPageProps) {
  const { error, isLoading } = useCategories(id!);
  const [selectedID, setSelectedID] = useState<string>("");

  return (
    <LoadDataDecorator error={error} isLoading={isLoading}>
      <Flex direction="column" className={styles.page}>
        <ConfigurationHeader name={name} edit={edit} className={styles.header} />
        <ConfigurationContent selectedID={selectedID} setSelectedID={setSelectedID} className={styles.content} />
        <ConfigurationFooter
          onCanceled={() => console.log("Modigy configuration ", name, " canceled")}
          onCompleted={() => console.log("Modigy configuration ", name, " completed")}
          className={styles.footer}
        />
      </Flex>
    </LoadDataDecorator>
  );
}
