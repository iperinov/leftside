import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import { findItemParent } from "~/components/tree/common/findItem";
import { useConfigurationCategories } from "~/hooks/configurationCategories/useConfigurationCategories";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import ConfigurationSidebar from "~/components/categories/ConfigurationSidebar";
import AddNewCategory from "~/components/categories/AddNewCategory";
import RenameCategory from "~/components/categories/RenameCategory";
import DuplicateCategory from "~/components/categories/DuplicateCategory";
import DeleteCategory from "~/components/categories/DeleteCategory";
import styles from "./ModifyConfigurationPage.module.css";
import ConfigurationHeader from "~/components/categories/ConfigurationHeader";
import Configuration from "~/routes/configuration";
import ConfigurationFooter from "~/components/categories/ConfigurationFooter";

interface ModifyConfigurationPageProps {
  id: string;
  name: string;
  edit: boolean;
}

export default function ModifyConfigurationPage({ id, name, edit }: ModifyConfigurationPageProps) {
  const { error, isLoading } = useConfigurationCategories(id!);
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);
  const [selectedID, setSelectedID] = useState<string>("");
  const [addItemData, setAddItemData] = useState<{ level: number; parentID: string }>();
  const [renameItemData, setRenameItemData] = useState<{ id: string; name: string }>();
  const [duplicateItemData, setDuplicateItemData] = useState<{ id: string; name: string; parentID: string }>();
  const [deleteItemData, setDeleteItemData] = useState<{ id: string }>();

  console.log("ModifyConfigurationPage categories: ", error, isLoading, rootCategory.children);

  return (
    <Flex direction="column" className={styles.page}>
      <ConfigurationHeader name={name} edit={edit} className={styles.header} />
      <Flex direction="row" className={styles.content}>
        <LoadDataDecorator error={error} isLoading={isLoading}>
          <ConfigurationSidebar
            className={styles.sideBar}
            selectedID={selectedID}
            onSelected={(item) => setSelectedID(selectedID === item.id ? "" : item.id)}
            onAdd={(level, parentID) => setAddItemData({ level, parentID })}
            onRename={(item) => setRenameItemData({ id: item.id, name: item.name })}
            onDuplicate={(item) => setDuplicateItemData({ id: item.id, name: item.name, parentID: findItemParent(item.id, rootCategory)?.id || "" })}
            onDelete={(item) => setDeleteItemData({ id: item.id })}
          />

          <main className={styles.main}>Configuration panel</main>

          <Flex className={styles.context}>Context panel</Flex>

          {addItemData && (
            <AddNewCategory {...addItemData} onCompleted={() => setAddItemData(undefined)} onCanceled={() => setAddItemData(undefined)} />
          )}
          {renameItemData && (
            <RenameCategory {...renameItemData} onCompleted={() => setRenameItemData(undefined)} onCanceled={() => setRenameItemData(undefined)} />
          )}
          {duplicateItemData && (
            <DuplicateCategory
              {...duplicateItemData}
              onCompleted={() => setDuplicateItemData(undefined)}
              onCanceled={() => setDuplicateItemData(undefined)}
            />
          )}
          {deleteItemData && (
            <DeleteCategory {...deleteItemData} onCompleted={() => setDeleteItemData(undefined)} onCanceled={() => setDeleteItemData(undefined)} />
          )}
        </LoadDataDecorator>
      </Flex>
      <ConfigurationFooter onCanceled={} onCompleted={}/>
    </Flex>
  );
}
