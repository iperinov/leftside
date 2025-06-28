import { useRealSports } from "~/hooks/useRealSport";
import EditNameDialog from "../dialogs/EditNameDialog";
import { useDeleteCategory } from "~/hooks/configurationCategories/useDeleteCategory";

interface DeleteConfigurationProps {
  uuid: string;
  onStarted?: () => void;
  onCompleted?: () => void;
}

export default function DeleteConfiguration({ uuid, onStarted = () => {}, onCompleted = () => {} }: DeleteConfigurationProps) {
  const { mutate: deleteFilter, isPending: isAddPending } = useDeleteCategory();
  const { isLoading, error, data: sports } = useRealSports();

  if (!sports) throw new Error("Filters data is not available");

  return (
    <EditNameDialog
      title="Delete Item"
      description="Enter 'DELETE' to delete the item:"
      confirmText="Delete"
      destructive={true}
      open={true}
      onConfirm={() => deleteFilter({uuid})}
      onCancel={onCompleted}
      validName={(name) => name === "DELETE"}
    />
  );
}
