import { useRealSports } from "~/hooks/useRealSport";
import EditNameDialog from "../dialogs/EditNameDialog";
import { findItemSiblings } from "../tree/common/findItem";
import { useRenameFilter } from "~/hooks/configurationCategories/useRenameCategory";

interface RenameConfigurationProps {
  uuid: string;
  name: string;
  onStarted?: () => void;
  onCompleted?: () => void;
}

export default function RenameConfiguration({ uuid, name, onStarted = () => {}, onCompleted = () => {} }: RenameConfigurationProps) {
  const { mutate: renameFilter, isPending: isAddPending } = useRenameFilter();
  const { isLoading, error, data: sports } = useRealSports();

  if (!sports) throw new Error("Filters data is not available");

  return (
    <EditNameDialog
      title="Rename Item"
      description="Enter a new name for the item:"
      confirmText="Rename"
      open={true}
      currentName={name}
      onConfirm={(name) => renameFilter({uuid , name})}
      onCancel={onCompleted}
      validName={(name) => findItemSiblings(uuid, sports!)?.find((item) => item.name === name) === undefined}
    />
  );
}
