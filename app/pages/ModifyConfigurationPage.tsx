import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import { findItemParent } from "~/components/tree/common/findItem";
import { useConfigurationCategories } from "~/hooks/configurationCategories/useConfigurationCategories";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import ConfigurationSidebar from "~/components/configuration/ConfigurationSidebar";
import AddNewCategory from "~/components/configuration/AddNewCategory";
import RenameCategory from "~/components/configuration/RenameCategory";
import DuplicateCategory from "~/components/configuration/DuplicateCategory";
import DeleteCategory from "~/components/configuration/DeleteCategory";
import styles from "./ModifyConfigurationPage.module.css";

interface ModifyConfigurationPageProps {
  configID?: string;
}

export default function ModifyConfigurationPage({ configID }: ModifyConfigurationPageProps) {
  const { error, isLoading } = useConfigurationCategories(configID!);
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);
  const [selectedID, setSelectedID] = useState<string>("");
  const [addItemData, setAddItemData] = useState<{ level: number; parentID: string }>();
  const [renameItemData, setRenameItemData] = useState<{ id: string; name: string }>();
  const [duplicateItemData, setDuplicateItemData] = useState<{ id: string; name: string; parentID: string }>();
  const [deleteItemData, setDeleteItemData] = useState<{ id: string }>();

  console.log("ModifyConfigurationPage categories: ", error, isLoading, rootCategory.children);

  return (
    <>
      <LoadDataDecorator error={error} isLoading={isLoading}>
        <Flex p="3" className={styles.configurationPage}>
          <aside className={styles.sideBar}>
            <ConfigurationSidebar
              selectedID={selectedID}
              onSelected={(item) => setSelectedID(selectedID === item.id ? "" : item.id)}
              onAdd={(level, parentID) => setAddItemData({ level, parentID })}
              onRename={(item) => setRenameItemData({ id: item.id, name: item.name })}
              onDuplicate={(item) =>
                setDuplicateItemData({ id: item.id, name: item.name, parentID: findItemParent(item.id, rootCategory)?.id || "" })
              }
              onDelete={(item) => setDeleteItemData({ id: item.id })}
            />
          </aside>

          <main className={styles.mainContent}></main>
        </Flex>

        {addItemData && <AddNewCategory {...addItemData} onCompleted={() => setAddItemData(undefined)} onCanceled={() => setAddItemData(undefined)}/>}
        {renameItemData && <RenameCategory {...renameItemData} onCompleted={() => setRenameItemData(undefined)}  onCanceled={() => setRenameItemData(undefined)}/>}
        {duplicateItemData && <DuplicateCategory {...duplicateItemData} onCompleted={() => setDuplicateItemData(undefined)} onCanceled={() => setDuplicateItemData(undefined)} />}
        {deleteItemData && <DeleteCategory {...deleteItemData} onCompleted={() => setDeleteItemData(undefined)} onCanceled={() => setDeleteItemData(undefined)}/>}
      </LoadDataDecorator>
    </>
  );
}
