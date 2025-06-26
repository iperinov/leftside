import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import { useState } from "react";
import type { MenuItem } from "~/components/dropdownContextMenu/DropdownContextMenu";
import Tree from "~/components/tree/Tree";
import { Flex } from "@radix-ui/themes";
import { findItem, findItemSiblings, findItemTrail } from "~/components/tree/common/findItem";
import EditNameDialog from "~/components/dialogs/EditNameDialog";
import useAddItemState from "~/hooks/sportConfigs/useAddItemState";
import useRenameItemState from "~/hooks/sportConfigs/useRenameItemState";
import useDuplicateItemState from "~/hooks/sportConfigs/useDuplicateItemState";
import useDeleteItemState from "~/hooks/sportConfigs/useDeleteItemState";
import styles from "./ConfigurationsPage.module.css";
import useSports from "~/hooks/useSports";
import AddNewFilterDialog from "~/components/dialogs/AddNewFilterDialog";
import makeRoot from "~/components/tree/common/makeRoot";
import formatOrdinal from "~/common/formatOrdinal";
import type { FilterItem } from "~/api/configs/sportFiltersApi";

export default function ConfigurationsPage() {
  const { isLoading, error, filters, catalog } = useSports();

  const [selectedID, setSelectedID] = useState<string>("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const { addItemData, setAddItemData, resetAddItemData, addFilter, isAddPending, addInProgressForParentID, setAddInProgressForParentID } = useAddItemState();
  const { renameItemData, setRenameItemData, resetRenameItemData, renameFilter, isRenamePending } = useRenameItemState();
  const { duplicateItemData, setDuplicateItemData, resetDuplicateItemData, duplicateFilter, isDuplicatePending } = useDuplicateItemState();
  const { deleteItemData, setDeleteItemData, resetDeleteItemData, deleteFilter, isDeletePending } = useDeleteItemState();

  const onAddLevel = (level: number, parent: FilterItem) => {
    setAddItemData({ level, parentID: parent.id });
  };

  const onRename = (context?: FilterItem) => {
    if (!context) throw new Error("Context is required for renaming an item");
    const renameItem = findItem(context.id, filters!);
    if (!renameItem) {
      throw new Error(`Item with id ${context.id} not found`);
    }
    setRenameItemData({ id: context.id, name: renameItem.name });
  };

  const onDuplicate = (context?: FilterItem) => {
    if (!context) throw new Error("Context is required for duplicating an item");
    const duplicateItemsTrail = findItemTrail(context.id, filters!);
    if (!duplicateItemsTrail || duplicateItemsTrail.length === 0) {
      throw new Error(`Item with id ${context.id} not found`);
    }

    if (duplicateItemsTrail.length === 1) {
      setDuplicateItemData({ id: duplicateItemsTrail[0].id, name: duplicateItemsTrail[0].name });
    } else {
      const item = duplicateItemsTrail.at(-1)!;
      const parent = duplicateItemsTrail.at(-2)!;
      setDuplicateItemData({ id: item.id, name: item.name, parentID: parent.id });
    }
  };

  const onDelete = (context?: FilterItem) => {
    if (!context) throw new Error("Context is required for deleting an item");
    setDeleteItemData({ id: context.id });
  };

  const onSelected = (item: FilterItem) => {
    setSelectedID(selectedID === item.id ? "" : item.id);
  };

  const menuItems: MenuItem<FilterItem>[] = [
    { name: "Rename", action: onRename },
    { name: "Delete", action: onDelete },
    { name: "Duplicate", action: onDuplicate },
  ];

  return (
    <>
      <Flex p="3" className={styles.configurationPage}>
        {/* Sidebar with Tree */}
        <aside className={styles.sideBar}>
          <LoadDataDecorator error={error} isLoading={isLoading}>
            <Tree
              root={makeRoot(filters!)}
              level={0}
              reorder={{
                allowed: (item, parent) => true,
                handler: (item, oldParent, newParent) => {
                  // TODO: Implement reorder logic here
                },
              }}
              expand={{
                allowed: (item, level) => !!item.children,
                itemIDs: expandedItems,
                handler: (item, expand) => setExpandedItems((prev) => (expand ? [...prev, item.id] : prev.filter((id) => id !== item.id))),
              }}
              addToParent={{
                allowed: (level, parentID) => level < 2,
                handler: onAddLevel,
                toString: (level, parentID) => `Add ${formatOrdinal(level + 1)} level`,
                inProgressID: addInProgressForParentID,
              }}
              selection={{
                allowed: (item) => !item.pending && !item.children,
                selectedID: selectedID,
                handler: onSelected,
              }}
              contextMenu={{
                canItemHaveContextMenu: (item) => true,
                menuItems: menuItems,
              }}
            />
          </LoadDataDecorator>
        </aside>

        {/* Content Area */}
        <main className={styles.mainContent}>
          {/* Placeholder for future content */}
          {/* <div className=" rounded-xl" /> */}
        </main>
      </Flex>

      {addItemData && (
        <AddNewFilterDialog
          level={addItemData.level}
          //parentID={addItemData.parentID}
          open={true}
          onConfirm={(name) => {
            addFilter({ ...addItemData, name });
            setAddInProgressForParentID(addItemData.parentID);
          }}
          onCancel={resetAddItemData}
          validName={(name) =>
            !addItemData.parentID
              ? filters!.find((item) => item.name === name) === undefined
              : findItem<FilterItem>(addItemData.parentID, filters!)?.children?.find((item) => item.name === name) === undefined
          }
        />
      )}
      {renameItemData && (
        <EditNameDialog
          title="Rename Item"
          description="Enter a new name for the item:"
          confirmText="Rename"
          open={true}
          currentName={renameItemData.name}
          onConfirm={(name) => renameFilter({ ...renameItemData, name })}
          onCancel={resetRenameItemData}
          validName={(name) => findItemSiblings(renameItemData.id, filters!)?.find((item) => item.name === name) === undefined}
        />
      )}
      {duplicateItemData && (
        <EditNameDialog
          title="Duplicate Item"
          description="Enter a new name for the duplicated item:"
          confirmText="Duplicate"
          open={true}
          currentName={duplicateItemData.name}
          onConfirm={(name) => duplicateFilter({ ...duplicateItemData, name })}
          onCancel={resetDuplicateItemData}
          validName={(name) => findItemSiblings(duplicateItemData.id, filters!)?.find((item) => item.name === name) === undefined}
        />
      )}
      {deleteItemData && (
        <EditNameDialog
          title="Delete Item"
          description="Enter 'DELETE' to delete the item:"
          confirmText="Delete"
          destructive={true}
          open={true}
          onConfirm={(name) => deleteFilter(deleteItemData)}
          onCancel={resetDeleteItemData}
          validName={(name) => name === "DELETE"}
        />
      )}
    </>
  );
}
