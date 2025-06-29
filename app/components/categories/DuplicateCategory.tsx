import EditNameDialog from "../dialogs/EditNameDialog";
import { findItemSiblings } from "../tree/common/findItem";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";

interface DuplicateCategoryProps {
  id: string;
  name: string;
  parentID: string;
  onCompleted?: () => void;
  onCanceled?: () => void;
}

export default function DuplicateCategory({ id, name, parentID, onCompleted, onCanceled }: DuplicateCategoryProps) {
  const duplicateCategory = useCategoryTreeStore((state) => state.duplicateCategory);
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);
  
  return (
    <EditNameDialog
      title="Duplicate Item"
      description="Enter a new name for the duplicated item:"
      confirmText="Duplicate"
      open={true}
      currentName={name}
      onConfirm={(name) => {
        duplicateCategory(id, name, parentID)
        onCompleted?.()
      }}
      onCancel={onCanceled}
      validName={(name) => findItemSiblings(id, rootCategory)?.find((item) => item.name === name) === undefined}
    />
  );
}
