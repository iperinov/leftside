import useSports from "~/hooks/useSports";
import EditNameDialog from "../dialogs/EditNameDialog";
import { findItemSiblings } from "../tree/common/findItem";
import { useDuplicateFilter } from "~/hooks/configurations/useDuplicateItemState";

interface DuplicateConfigurationProps {
  id: string;
  name: string;
  parentID: string;
  onStarted?: () => void;
  onCompleted?: () => void;
}

export default function DuplicateConfiguration({ id, name, parentID, onStarted = () => {}, onCompleted = () => {} }: DuplicateConfigurationProps) {
  const { mutate: duplicateFilter, isPending: isAddPending } = useDuplicateFilter();
  const { isLoading, error, filters, catalog } = useSports();

  if (!filters) throw new Error("Filters data is not available");

  return (
    <EditNameDialog
      title="Duplicate Item"
      description="Enter a new name for the duplicated item:"
      confirmText="Duplicate"
      open={true}
      currentName={name}
      onConfirm={(name) => duplicateFilter({ id, name, parentID })}
      onCancel={onCompleted}
      validName={(name) => findItemSiblings(id, filters!)?.find((item) => item.name === name) === undefined}
    />
  );
}
