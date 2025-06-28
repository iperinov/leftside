import AddNewConfigurationDialog from "./AddNewConfigurationDialog";
import { findItem } from "../tree/common/findItem";

import type { ItemType } from "~/common/itemTypes";
import type { Category } from "~/api/scs/configurations/config.types";
import { useConfigurationCategories } from "~/hooks/configurationCategories/useConfigurationCategories";
import type CategoryTreeItem from "./CategoryTreeItem";

interface AddNewConfigurationCategoryProps {
  configUUID: string;
  parentUUID: string;
  level: number;
  onCanceled?: () => void;
  onCompleted?: () => void;
}

export default function AddNewConfigurationCategory({ configUUID, parentUUID, level, onCompleted = () => {}, onCanceled = () => {} }: AddNewConfigurationCategoryProps) {
  const {data: categories} = useConfigurationCategories(configUUID);
  if (!categories) throw new Error("Categories data is not available on add new category");

  const addConfiguration = (name: string, type: ItemType, sports: string[], leagues: string[]) => {
    const parent = findItem<CategoryTreeItem>(parentUUID, categories);
    if (!parent) throw new Error(`Parent with ID ${parentUUID} not found`);

    onCompleted?.()
  }

  return (
    <AddNewConfigurationDialog
      level={level}
      open={true}
      onConfirm={addConfiguration}
      onCancel={onCanceled}
      validName={(name) =>
        !parentUUID
          ? categories.find((item) => item.name === name) === undefined
          : findItem<CategoryTreeItem>(parentUUID, categories)?.children?.find((item) => item.name === name) === undefined
      }
    />
  );
}
