import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import { useState, type ReactNode } from "react";
import type { MenuItem } from "~/components/dropdownContextMenu/DropdownContextMenu";
import useSportFilters, { useAddFilter, useDuplicateFilter, useRenameFilter } from "~/hooks/useSportFilters";
import type TreeItemData from "~/components/tree/TreeItemData";
import Tree from "~/components/tree/Tree";
import { Flex } from "@radix-ui/themes";
import styles from "./ConfigurationPage.module.css"
import SportConfigRenameDialog from "~/components/dialogs/EditNameDialog";
import { findItem, findItemTrail } from "~/common/findItem";
import { renameSportFilter } from "~/api/configs/sportFiltersApi";
import ConfirmDialog from "~/components/dialogs/ConfimDialog";
import EditNameDialog from "~/components/dialogs/EditNameDialog";

// TODO: remove
let index = 0;

export default function ConfigurationsPage() {
  const { isLoading, data: sportFilters, error } = useSportFilters();
  const [selectedID, setSelectedID] = useState<string>("");
  const [addItemData, setAddItemData] = useState<{parentID?: string}>();
  const resetAddItemData = () => setAddItemData(undefined);
  const [renameItemData, setRenameItemData] = useState<{id: string, name: string}>();
  const resetRenameItemData = () => setRenameItemData(undefined);
  const [duplicateItemData, setDuplicateItemData] = useState<{id: string, parentID?: string}>();
  const resetDuplicateItemData = () => setDuplicateItemData(undefined);
  const { mutate: addFilter, isPending: isAddPending } = useAddFilter(resetAddItemData);
  const { mutate: renameFilter, isPending: isRenamePending } = useRenameFilter(resetRenameItemData);
  const { mutate: duplicateFilter, isPending: isDuplicatePending } = useDuplicateFilter(resetDuplicateItemData);

  if (isLoading || !sportFilters) {
    return <div>Loading...</div>;
  }

  const onAddLevel = (parentID?: string) => {
    setAddItemData({ parentID });
  };

  const onRename = (context: any) => {
    const itemID = String(context);
    const renameItem = findItem<TreeItemData>(itemID, sportFilters);
    if (!renameItem) {
      throw new Error(`Item with id ${itemID} not found`);
    }
    setRenameItemData({id: itemID, name: renameItem.name});
  };

  const onDuplicate = (context: any) => {
    const itemID = String(context);
    const duplicateItemsTrail = findItemTrail<TreeItemData>(itemID, sportFilters);
    if (!duplicateItemsTrail || duplicateItemsTrail.length === 0) {
      throw new Error(`Item with id ${itemID} not found`);
    }

    if (duplicateItemsTrail.length === 1) {
      setDuplicateItemData({ id: duplicateItemsTrail[0].id });
    } else {
      setDuplicateItemData({ id: duplicateItemsTrail[0].id, parentID: duplicateItemsTrail[1].id });
    }
  };

  const onDelete = (context: any) => {
    console.log(`Delete clicked for item with id: ${context}`);
  };

  const onSelected = (id?: string) => {
    if (selectedID === id) {
      // If the same item is clicked again, deselect it
      setSelectedID("");
      return;
    }
    setSelectedID(id || "");
  };

  const menuItems: MenuItem[] = [
    { name: "Rename", action: onRename },
    { name: "Delete", action: onDelete },
    { name: "Duplicate", action: onDuplicate },
  ];

  return (
    <>
      <Flex p="3" className={ styles.configurationPage }>
        <aside className={ styles.sideBar }>
          <LoadDataDecorator error={error} isLoading={isLoading}>
            <Tree rootItems={sportFilters} menuItems={menuItems} onAddLevel={onAddLevel} selectedID={selectedID} onSelected={onSelected} mutationInProgress={isAddPending} />
          </LoadDataDecorator>
        </aside>

        {/* Content Area */}
        <main className={ styles.mainContent }>
          {/* Placeholder for future content */}
          {/* <div className=" rounded-xl" /> */}
        </main>
      </Flex>
      {addItemData && <EditNameDialog open={true} currentName="" onConfirm={(name) => addFilter({ name: name, parentID: addItemData.parentID })} onCancel={resetAddItemData}/>}
      {renameItemData && <EditNameDialog open={true} currentName={renameItemData.name} onConfirm={(name) => renameFilter({ id: renameItemData.id, name })} onCancel={resetRenameItemData} />}
      {duplicateItemData && <ConfirmDialog open={true} onConfirm={() => duplicateFilter({id: duplicateItemData.id, parentID: duplicateItemData.parentID})} onCancel={resetDuplicateItemData} />}
    </>
  );
}
