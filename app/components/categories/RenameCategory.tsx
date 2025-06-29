import EditNameDialog from "../dialogs/EditNameDialog";
import { findItemSiblings } from "../tree/common/findItem";
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
      title="Rename Item"
      description="Enter a new name for the item:"
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
