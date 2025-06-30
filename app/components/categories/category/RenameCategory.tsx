
import EditNameDialog from "~/components/dialogs/EditNameDialog";
import { findItemSiblings } from "~/components/tree/common/findItem";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";

interface RenameCategoryProps {
  id: string;
  name: string;
  onCompleted?: () => void;
  onCanceled?: () => void;
}

export default function RenameCategory({ id, name, onCompleted, onCanceled }: RenameCategoryProps) {
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);
  const renameCategory = useCategoryTreeStore((state) => state.renameCategory);

  return (
    <EditNameDialog
      title="Rename category"
      description="Enter a new name for the categort:"
      confirmText="Rename"
      open={true}
      currentName={name}
      onConfirm={(name) => {
        if (!renameCategory(id, name)) {
          throw new Error(`Failed to rename item with ID ${id}`);
        }
        onCompleted?.()
      }}
      onCancel={onCanceled}
      validName={(name) => findItemSiblings(id, rootCategory)?.find((item) => item.name === name) === undefined}
    />
  );
}
