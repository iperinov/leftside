import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import { findItemParent } from "~/components/tree/common/findItem";
import styles from "./ModifyConfigurationPage.module.css";
import AddNewConfigurationCategory from "~/components/configuration/AddNewConfigurationCategory";
import RenameConfiguration from "~/components/configuration/RenameConfiguration";
import DuplicateConfiguration from "~/components/configuration/DuplicateConfiguration";
import DeleteConfiguration from "~/components/configuration/DeleteConfiguration";
import ConfigurationSidebar from "~/components/configuration/ConfigurationSidebar";
import { useConfigurationCategories } from "~/hooks/configurationCategories/useConfigurationCategories";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";

interface ModifyConfigurationPageProps {
  configUUID?: string;
}

export default function ModifyConfigurationPage({ configUUID }: ModifyConfigurationPageProps) {
  const { error, isLoading, data: categories } = useConfigurationCategories(configUUID!);
  const [selectedUUID, setSelectedUUID] = useState<string>("");
  const [addItemData, setAddItemData] = useState<{ level: number; parentUUID: string }>();
  const [renameItemData, setRenameItemData] = useState<{ uuid: string; name: string }>();
  const [duplicateItemData, setDuplicateItemData] = useState<{ uuid: string; name: string; parentUUID: string }>();
  const [deleteItemData, setDeleteItemData] = useState<{ uuid: string }>();

  return (
    <>
      <LoadDataDecorator error={error} isLoading={isLoading}>
        <Flex p="3" className={styles.configurationPage}>
          <aside className={styles.sideBar}>
            <ConfigurationSidebar
              configUUID={configUUID}
              selectedUUID={selectedUUID}
              onSelected={(item) => setSelectedUUID(selectedUUID === item.uuid ? "" : item.uuid)}
              onAdd={(level, parentUUID) => setAddItemData({ level, parentUUID })}
              onRename={(item) => setRenameItemData({ uuid: item.uuid, name: item.name })}
              onDuplicate={(item) =>
                setDuplicateItemData({ uuid: item.uuid, name: item.name, parentUUID: findItemParent(item.uuid, categories!)?.uuid || "" })
              }
              onDelete={(item) => setDeleteItemData({ uuid: item.uuid })}
            />
          </aside>

          <main className={styles.mainContent}></main>
        </Flex>

        {addItemData && <AddNewConfigurationCategory configUUID={configUUID!} {...addItemData} onCompleted={() => setAddItemData(undefined)} />}
        {renameItemData && <RenameConfiguration {...renameItemData} onCompleted={() => setRenameItemData(undefined)} />}
        {duplicateItemData && <DuplicateConfiguration {...duplicateItemData} onCompleted={() => setDuplicateItemData(undefined)} />}
        {deleteItemData && <DeleteConfiguration {...deleteItemData} onCompleted={() => setDeleteItemData(undefined)} />}
      </LoadDataDecorator>
    </>
  );
}
