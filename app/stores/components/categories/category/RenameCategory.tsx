import EditNameDialog from "~/components/dialogs/EditNameDialog";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";

interface RenameCategoryProps {
  id: string;
  name: string;
  onCompleted?: () => void;
  onCanceled?: () => void;
}

export default function RenameCategory({ id, name, onCompleted, onCanceled }: RenameCategoryProps) {
  const renameCategory = useCategoryTreeStore((state) => state.renameCategory);
  const findCategorySiblings = useCategoryTreeStore((state) => state.findCategorySiblings);

  return (
    <EditNameDialog
      title="Rename category"
      description="Enter a new name for the category:"
      confirmText="Rename"
      open={true}
      currentName={name}
      onConfirm={(name) => {
        if (!renameCategory(id, name)) {
          throw new Error(`Failed to rename item with ID ${id}`);
        }
        onCompleted?.();
      }}
      onCancel={onCanceled}
      validName={(name) => !findCategorySiblings(id)?.find((item) => item.name === name.trim())}
    />
  );
}
