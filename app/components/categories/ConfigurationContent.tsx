import { Flex } from "@radix-ui/themes";
import LoadDataDecorator from "../loading/LoadDataDecorator";
import ConfigurationSidebar from "./ConfigurationSidebar";
import AddNewCategory from "./AddNewCategory";
import RenameCategory from "./RenameCategory";
import DuplicateCategory from "./DuplicateCategory";
import DeleteCategory from "./DeleteCategory";

interface ConfigurationContentProps {}

export default function ConfigurationContent({}: ConfigurationContentProps) {
  return (
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
  );
}
