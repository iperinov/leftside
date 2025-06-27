import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import { findItemParent } from "~/components/tree/common/findItem";
import useSports from "~/hooks/useSports";
import styles from "./ModifyConfigurationPage.module.css";
import AddNewConfiguration from "~/components/modifyConfiguration/AddNewConfiguration";
import RenameConfiguration from "~/components/modifyConfiguration/RenameConfiguration";
import DuplicateConfiguration from "~/components/modifyConfiguration/DuplicateConfiguration";
import DeleteConfiguration from "~/components/modifyConfiguration/DeleteConfiguration";
import ConfigurationSidebar from "~/components/modifyConfiguration/ConfigurationSidebar";

interface ModifyConfigurationPageProps {
  id?: string;
}

export default function ModifyConfigurationPage({id}: ModifyConfigurationPageProps) {
  const { isLoading, error, filters, catalog } = useSports();

  const [selectedID, setSelectedID] = useState<string>("");
  const [addItemData, setAddItemData] = useState<{ level: number; parentID: string }>();
  const [renameItemData, setRenameItemData] = useState<{ id: string; name: string }>();
  const [duplicateItemData, setDuplicateItemData] = useState<{ id: string; name: string; parentID: string }>();
  const [deleteItemData, setDeleteItemData] = useState<{ id: string }>();


  return (
    <>
      <Flex p="3" className={styles.configurationPage}>
        <aside className={styles.sideBar}>
          <ConfigurationSidebar 
            selectedID={selectedID} 
            onSelected={(item) => setSelectedID(selectedID === item.id ? "" : item.id)} 
            onAdd={(level, parentID) => setAddItemData({ level, parentID })} 
            onRename={(item) => setRenameItemData({ id: item.id, name: item.name })} 
            onDuplicate={(item) => setDuplicateItemData({ id: item.id, name: item.name, parentID: findItemParent(item.id, filters!)?.id || ""})} 
            onDelete={(item) => setDeleteItemData({ id: item.id })} 
          />       
        </aside>

        <main className={styles.mainContent}>
          
        </main>
      </Flex>

      {addItemData && <AddNewConfiguration {...addItemData} onCompleted={() => setAddItemData(undefined)} />}
      {renameItemData && <RenameConfiguration {...renameItemData} onCompleted={() => setRenameItemData(undefined)}/>}
      {duplicateItemData && <DuplicateConfiguration {...duplicateItemData} onCompleted={() => setDuplicateItemData(undefined)} />}       
      {deleteItemData && <DeleteConfiguration {...deleteItemData} onCompleted={() => setDeleteItemData(undefined)} />}
    </>
  );
}
