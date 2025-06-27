import useSports from "~/hooks/useSports";
import EditNameDialog from "../dialogs/EditNameDialog";
import { findItemSiblings } from "../tree/common/findItem";
import { useDeleteFilter } from "~/hooks/configurations/useDeleteItemState";

interface DeleteConfigurationProps {
  id: string;
  onStarted?: () => void;
  onCompleted?: () => void;
}

export default function DeleteConfiguration({ id, onStarted = () => {}, onCompleted = () => {} }: DeleteConfigurationProps) {
  const { mutate: deleteFilter, isPending: isAddPending } = useDeleteFilter();
  const { isLoading, error, filters, catalog } = useSports();

  if (!filters) throw new Error("Filters data is not available");

  return (
    <EditNameDialog
      title="Delete Item"
      description="Enter 'DELETE' to delete the item:"
      confirmText="Delete"
      destructive={true}
      open={true}
      onConfirm={() => deleteFilter({id})}
      onCancel={onCompleted}
      validName={(name) => name === "DELETE"}
    />
  );
}
