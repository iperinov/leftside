import { Flex } from "@radix-ui/themes";
import type ClassNameProps from "../shared/ClassNameProps";
import FiltersGroupRow from "./filters/FilterGroupRow";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { useState } from "react";
import DuplicateFilterGroup from "./DuplicateFilterGroup";
import DeleteFilterGroup from "./DeleteFilterGroup";
import EmptyFilterGroupRow from "./filters/EmptyFilterGroupRow";

interface ConfigurationContentMainProps {
  categoryID: string;
}

export default function ConfigurationContentMain({ categoryID, className }: ConfigurationContentMainProps & ClassNameProps) {
  const category = useCategoryTreeStore((state) => state.findCategory(categoryID));
  const [duplicateItemData, setDuplicateItemData] = useState<{categoryID: string, filterGroupID: string}>();
  const [deleteItemData, setDeleteItemData] = useState<{categoryID: string, filterGroupID: string}>();
  const [addNewFilterGroup, setAddNewFilterGroup] = useState<boolean>(false);
  const hasFilters = category?.filterGroups ? category.filterGroups.length > 0 : false;

  console.log("ConfigurationContentMain", duplicateItemData);
  

  return (
    <>
      <Flex gap="2" direction="column" p="2" flexGrow="1">
        {hasFilters ? (
          category?.filterGroups?.map((filterGroup) => (
            <FiltersGroupRow
              key={filterGroup.uuid}
              categoryID={category.id}
              filterGroupID={filterGroup.uuid}
              onDuplicate={(categoryID, filterGroupID) => setDuplicateItemData({categoryID, filterGroupID})}
              onDelete={(categoryID, filterGroupID) => setDeleteItemData({categoryID, filterGroupID})}
              onReorder={() => console.log("Reorder filter group", filterGroup)}
            />
          ))) : (
            <EmptyFilterGroupRow
              text={category?.type === "flat" ?
                "No filters in this group. Click 'Add Filter' to create a new filter. Select child navigation item to proceed." :
                "Select child navigation item to proceed."
            }/>
          )}
      </Flex>

      {duplicateItemData && (
        <DuplicateFilterGroup
          {...duplicateItemData}
          onCompleted={() => setDuplicateItemData(undefined)}
          onCanceled={() => setDuplicateItemData(undefined)}
        />
      )}
      {deleteItemData && (
        <DeleteFilterGroup 
          {...deleteItemData} 
          onCompleted={() => setDeleteItemData(undefined)} 
          onCanceled={() => setDeleteItemData(undefined)} />
      )}
    </>
  );
}
