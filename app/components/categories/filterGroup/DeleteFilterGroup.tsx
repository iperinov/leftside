import EditNameDialog from "~/components/dialogs/EditNameDialog";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";

interface DeleteFilterGroupProps {
  categoryUUID: string;
  filterGroupUUID: string;
  onCompleted?: () => void;
  onCanceled?: () => void;
}

export default function DeleteFilterGroup({ categoryUUID, filterGroupUUID, onCompleted, onCanceled }: DeleteFilterGroupProps) {
  const deleteFilterGroup = useCategoryTreeStore((state) => state.deleteFilterGroup);

  return (
    <EditNameDialog
      title="Delete filter group"
      description="Enter 'DELETE' to delete the group:"
      confirmText="Delete"
      destructive={true}
      open={true}
      onConfirm={() => {
        deleteFilterGroup(categoryUUID, filterGroupUUID);
        onCompleted?.();
      }}
      onCancel={onCanceled}
      validName={(name) => name.trim() === "DELETE"}
    />
  );
}
