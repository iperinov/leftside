import useAddItemState from "~/hooks/configurations/useAddItemState";
import AddNewFilterDialog from "../dialogs/AddNewFilterDialog";
import type { FilterItem } from "~/api/configs/sportFiltersApi";
import { findItem } from "../tree/common/findItem";
import { useState } from "react";
import useAddFilter from "~/hooks/configurations/useAddItemState";
import useSports from "~/hooks/useSports";

interface AddNewConfigurationProps {
  parentID: string;
  level: number;
  onStarted?: () => void;
  onCompleted?: () => void;
}

export default function AddNewConfiguration({ parentID, level, onStarted = () => {}, onCompleted = () => {} }: AddNewConfigurationProps) {
  const { mutate: addFilter, isPending: isAddPending } = useAddFilter(onCompleted);
  const { isLoading, error, filters, catalog } = useSports();

  if (!filters) throw new Error("Filters data is not available");

  return (
    <AddNewFilterDialog
      level={level}
      open={true}
      onConfirm={(name) => {
        addFilter({ parentID, name });
        onStarted?.();
      }}
      onCancel={onCompleted}
      validName={(name) =>
        !parentID
          ? filters!.find((item) => item.name === name) === undefined
          : findItem<FilterItem>(parentID, filters!)?.children?.find((item) => item.name === name) === undefined
      }
    />
  );
}
