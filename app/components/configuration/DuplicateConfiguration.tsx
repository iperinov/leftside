import { useRealSports } from "~/hooks/useRealSport";
import EditNameDialog from "../dialogs/EditNameDialog";
import { findItemSiblings } from "../tree/common/findItem";
import { useDuplicateCategory } from "~/hooks/configurationCategories/useDuplicateCategory";

interface DuplicateConfigurationProps {
  uuid: string;
  name: string;
  parentUUID: string;
  onStarted?: () => void;
  onCompleted?: () => void;
}

export default function DuplicateConfiguration({ uuid, name, parentUUID, onStarted = () => {}, onCompleted = () => {} }: DuplicateConfigurationProps) {
  const { mutate: duplicateFilter, isPending: isAddPending } = useDuplicateCategory();
  const { isLoading, error, data: sports } = useRealSports();

  if (!sports) throw new Error("Filters data is not available");

  return (
    <EditNameDialog
      title="Duplicate Item"
      description="Enter a new name for the duplicated item:"
      confirmText="Duplicate"
      open={true}
      currentName={name}
      onConfirm={(name) => duplicateFilter({ uuid, name, parentUUID })}
      onCancel={onCompleted}
      validName={(name) => findItemSiblings(uuid, sports!)?.find((item) => item.name === name) === undefined}
    />
  );
}
