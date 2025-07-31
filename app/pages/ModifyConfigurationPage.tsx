import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { AllFilter, BookRev, Category, ConfigMetadata, ConfigMetadataValue, FilterGroup, FilterType, FiltersTypeInteger, FiltersTypeString } from "~/api/sccs/types.gen";
import { isAllFilter } from "~/components/categories/AllItemData";
import ConfigurationContent from "~/components/categories/ConfigurationContent";
import ConfigurationFooter from "~/components/categories/ConfigurationFooter";
import ConfigurationHeader from "~/components/categories/ConfigurationHeader";
import type CategoryTreeItem from "~/components/categories/tree/CategoryTreeItem";
import InfoDialog from "~/components/dialogs/InfoDialog";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import iterateItem from "~/components/tree/common/iterateItem";
import { useInitConfigStore } from "~/hooks/categories/useInitConfigStore";
import { useAssignConfig } from "~/hooks/configuraitons/useAssignConfig";
import { useUpdateConfiguration } from "~/hooks/configuraitons/useUpdateConfiguration";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { useAuthStore } from "~/stores/useAuthStore";
import styles from "./ModifyConfigurationPage.module.css";

interface ModifyConfigurationPageProps {
  uuid?: string;
  edit?: boolean;
}

function toCategory(item: CategoryTreeItem): Category {
  return {
    uuid: item.id,
    name: item.name,
    type: item.type,
    filterGroups: item.filterGroups,
    children: item.children?.map(toCategory) || [],
  } as Category;
}

function toMetadata(item: CategoryTreeItem): ConfigMetadataValue {
  if (!item.iconID) throw new Error(`First level category(${item.name}) without icon`);

  return {
    icon: item.iconID,
    sport: item.sportID,
  } as ConfigMetadataValue;
}

export default function ModifyConfigurationPage({ uuid = "", edit = false }: ModifyConfigurationPageProps) {
  const { error, isLoading } = useInitConfigStore(uuid);
  const [selectedUUID, setSelectedUUID] = useState<string>("");
  const navigate = useNavigate();
  const configuration = useCategoryTreeStore((state) => state.configuration);
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);
  const assignedBooks = useCategoryTreeStore((state) => state.assignedBooks);
  const email = useAuthStore((state) => state.auth?.email);
  const [validateError, setValidateError] = useState("");
  const [updateConfigStatus, setUpdateConfigStatus] = useState<{ message?: string; error?: Error }>();
  const [assignConfigStatus, setAssignConfigStatus] = useState<{ message?: string; error?: Error }>();
  const updateConfig = useUpdateConfiguration({
    configUUID: uuid,
    onSuccess: (response) => {
      setUpdateConfigStatus({ message: "Configuration updated successfully" });
    },
    onError: (_error) => {
      setUpdateConfigStatus({ message: `Failed to update configuration: ${_error.message}`, error: _error });
      console.error(error);
    },
    onSettled: () => {
      navigate("/configurations/");
    },
  });
  const assignConfig = useAssignConfig({
    configUUID: uuid,
    onSuccess: (response) => {
      setUpdateConfigStatus({ message: "Books assigned successfully" });
    },
    onError: (_error) => {
      setUpdateConfigStatus({ message: `Failed to assign books: ${_error.message}`, error: _error });
      console.error(error);
    },
    onSettled: () => {
      navigate("/configurations/");
    },
  });

  if (!email) throw new Error("Not logged in user is trying to modify configuration");

  const onCancel = () => {
    navigate("/configurations/");
  };

  useEffect(() => {
    if (updateConfigStatus !== undefined && (assignConfigStatus !== undefined || assignedBooks.length === 0)) {
      if (updateConfigStatus.error === undefined && assignConfigStatus?.error === undefined) {
        toast.success(
          `${updateConfigStatus.message}
          ${assignConfigStatus?.message || ""}`,
        );
      } else {
        toast.error(
          `${updateConfigStatus.message}
          ${assignConfigStatus?.message || ""}`,
        );
      }
    }
  }, [updateConfigStatus, assignConfigStatus, assignedBooks.length]);


  
  const checkFilterGroup = (
    filterGroups: FilterGroup[], 
    valid: (filterGroup: FilterGroup) => boolean
  ): boolean => {
    return !!filterGroups.find((filterGroup) => valid(filterGroup))
  } 

  const checkFilterValue = (
    filterGroups: FilterGroup[], 
    filterType: FilterType, 
    valid: (filterValue: FiltersTypeString | FiltersTypeInteger | boolean | number | AllFilter) => boolean
  ): boolean => {
    return checkFilterGroup(filterGroups, (filter) =>
      filter.filters.findIndex(
        (filter) => filter.type === filterType && valid(filter.value),
      ) !== -1,
    )
  } 

  const validateConfig = () => {
    let error = "";
    iterateItem(rootCategory, (category) => {
      switch (category.type) {
        case "nested":
          if (category.children && category.children.length === 0) {
            if (category.id === rootCategory.id) {
              error = "No categories.";
            } else {
              error = `${category.name}: All parent categories must have at least one child.`;
            }
            return false;
          }
          return true;
        case "flat":
          if (category.filterGroups === undefined || category.filterGroups.length === 0) {
            error = `${category.name}: All child categories must have at least one filter group.`;
            return false;
          }
          if (!checkFilterValue(category.filterGroups, "sport", (value) => (isAllFilter(value) || (value as FiltersTypeString).length > 0))) {
            error = `${category.name}: All filter groups must have at least one sport or 'All' sports selected.`;
            return false;
          }
          if (!checkFilterGroup(category.filterGroups, (filterGroup) => filterGroup.groupBy !== undefined && filterGroup.groupBy.length > 0)) {
            error = `${category.name}: All filter groups must have group by selected.`;
            return false;
          }
          if (!checkFilterGroup(category.filterGroups, (filterGroup) => filterGroup.order === "asc" || filterGroup.order === "desc")) {
            error = `${category.name}: All filter groups must have sort by selected.`;
            return false;
          }
          return true;
      }
    });
    setValidateError(error);
    return error === "";
  };

  const onSave = async () => {
    if (!validateConfig()) return;

    updateConfig.mutate({
      path: { uuid: uuid },
      body: {
        uuid: uuid,
        rev: configuration.rev,
        name: configuration.name,
        categories: rootCategory.children?.map(toCategory) || [],
        metadata: rootCategory.children?.map(toMetadata) || [],
      },
    });

    if (assignedBooks.length > 0) {
      assignConfig.mutate({
        path: { uuid: uuid },
        body: assignedBooks.map(
          (book) =>
            ({
              id: book.id,
              rev: book.rev,
            }) as BookRev,
        ),
      });
    }
  };

  return (
    <>
      <LoadDataDecorator error={error} isLoading={isLoading || updateConfig.isPending || assignConfig.isPending}>
        <Flex direction="column" className={styles.page}>
          <ConfigurationHeader edit={edit} className={styles.header} />
          <ConfigurationContent selectedUUID={selectedUUID} setSelectedID={setSelectedUUID} className={styles.content} />
          <ConfigurationFooter onCancel={onCancel} onSave={onSave} className={styles.footer} isProcessing={updateConfig.isPending} />
        </Flex>
      </LoadDataDecorator>

      {validateError && <InfoDialog title="Validation error" description={validateError} onClose={() => setValidateError("")} />}
    </>
  );
}
