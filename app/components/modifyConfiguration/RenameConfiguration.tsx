import useSports from "~/hooks/useSports";
import EditNameDialog from "../dialogs/EditNameDialog";
import { findItemSiblings } from "../tree/common/findItem";
import { useRenameFilter } from "~/hooks/configurations/useRenameItemState";

interface RenameConfigurationProps {
  id: string;
  name: string;
  onStarted?: () => void;
  onCompleted?: () => void;
}

export default function RenameConfiguration({ id, name, onStarted = () => {}, onCompleted = () => {} }: RenameConfigurationProps) {
  const { mutate: renameFilter, isPending: isAddPending } = useRenameFilter();
  const { isLoading, error, filters, catalog } = useSports();

  if (!filters) throw new Error("Filters data is not available");

  return (
    <EditNameDialog
      title="Rename Item"
      description="Enter a new name for the item:"
      confirmText="Rename"
      open={true}
      currentName={name}
      onConfirm={(name) => renameFilter({id , name})}
      onCancel={onCompleted}
      validName={(name) => findItemSiblings(id, filters!)?.find((item) => item.name === name) === undefined}
    />
  );
}
