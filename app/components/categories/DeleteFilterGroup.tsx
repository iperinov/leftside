import EditNameDialog from "../dialogs/EditNameDialog";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";

interface DeleteFilterGroupProps {
  categoryID: string;
  filterGroupID: string;
  onCompleted?: () => void;
  onCanceled?: () => void;
}

export default function DeleteFilterGroup({ categoryID, filterGroupID, onCompleted, onCanceled }: DeleteFilterGroupProps) {
  const deleteFilterGroup = useCategoryTreeStore((state) => state.deleteFilterGroup);
 
  return (
    <EditNameDialog
      title="Delete filter group"
      description="Enter 'DELETE' to delete the group:"
      confirmText="Delete"
      destructive={true}
      open={true}
      onConfirm={() => {
        deleteFilterGroup(categoryID, filterGroupID);
        onCompleted?.();
      }}
      onCancel={onCanceled}
      validName={(name) => name === "DELETE"}
    />
  );
}
