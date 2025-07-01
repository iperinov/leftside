import { Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ClassNameProps from "../shared/ClassNameProps";
import DeleteFilterGroup from "./filterGroup/DeleteFilterGroup";
import DuplicateFilterGroup from "./filterGroup/DuplicateFilterGroup";
import EmptyFilterGroupRow from "./filterGroup/EmptyFilterGroupRow";
import FiltersGroupRow from "./filterGroup/FilterGroupRow";

interface ConfigurationContentMainProps {
  categoryID: string;
}

export default function ConfigurationContentMain({
  categoryID,
  className,
}: ConfigurationContentMainProps & ClassNameProps) {
  const category = useCategoryTreeStore((state) =>
    state.findCategory(categoryID),
  );
  const addEmptyFilterGroup = useCategoryTreeStore(
    (state) => state.addEmptyFilterGroup,
  );
  const [duplicateItemData, setDuplicateItemData] = useState<{
    categoryID: string;
    filterGroupID: string;
  }>();
  const [deleteItemData, setDeleteItemData] = useState<{
    categoryID: string;
    filterGroupID: string;
  }>();
  const hasFilters = category?.filterGroups
    ? category.filterGroups.length > 0
    : false;
  const showAddNewFilterGroup = category?.type === "flat";

  return (
    <>
      <Flex gap="2" direction="column" p="2" flexGrow="1">
        {hasFilters ? (
          category?.filterGroups?.map((filterGroup) => (
            <FiltersGroupRow
              key={filterGroup.uuid}
              categoryID={category.id}
              filterGroupID={filterGroup.uuid}
              onDuplicate={(categoryID, filterGroupID) =>
                setDuplicateItemData({ categoryID, filterGroupID })
              }
              onDelete={(categoryID, filterGroupID) =>
                setDeleteItemData({ categoryID, filterGroupID })
              }
              onReorder={() => console.log("Reorder filter group", filterGroup)} // TODO
            />
          ))
        ) : (
          <EmptyFilterGroupRow
            text={
              category?.type === "flat"
                ? "No filters in this group. Click 'Add Filter' to create a new filter. Select child navigation item to proceed."
                : "Select child navigation item to proceed."
            }
          />
        )}
        {showAddNewFilterGroup && (
          <Flex align="center" justify="center">
            <Button onClick={() => addEmptyFilterGroup(categoryID)}>
              Add New Group
            </Button>
          </Flex>
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
          onCanceled={() => setDeleteItemData(undefined)}
        />
      )}
    </>
  );
}
