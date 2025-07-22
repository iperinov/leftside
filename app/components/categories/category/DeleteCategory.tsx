import EditNameDialog from "~/components/dialogs/EditNameDialog";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";

interface DeleteCategoryProps {
  id: string;
  name: string;
  onCompleted?: () => void;
  onCanceled?: () => void;
}

export default function DeleteCategory({ id, name, onCompleted, onCanceled }: DeleteCategoryProps) {
  const deleteCategory = useCategoryTreeStore((state) => state.deleteCategory);

  return (
    <EditNameDialog
      title="Delete category"
      description={`Enter 'DELETE' to delete ${name} category:`}
      confirmText="Delete"
      destructive={true}
      open={true}
      onConfirm={() => {
        deleteCategory(id);
        onCompleted?.();
      }}
      onCancel={onCanceled}
      validName={(name) => name.trim() === "DELETE"}
    />
  );
}
