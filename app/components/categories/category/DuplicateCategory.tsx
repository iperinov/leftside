import EditNameDialog from "~/components/dialogs/EditNameDialog";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";

interface DuplicateCategoryProps {
  id: string;
  name: string;
  parentID: string;
  onCompleted?: () => void;
  onCanceled?: () => void;
}

export default function DuplicateCategory({
  id,
  name,
  parentID,
  onCompleted,
  onCanceled,
}: DuplicateCategoryProps) {
  const duplicateCategory = useCategoryTreeStore(
    (state) => state.duplicateCategory,
  );
  const findCategorySiblings = useCategoryTreeStore(
    (state) => state.findCategorySiblings,
  );

  return (
    <EditNameDialog
      title="Duplicate category"
      description="Enter a new name for the duplicated category:"
      confirmText="Duplicate"
      open={true}
      currentName={name}
      onConfirm={(name) => {
        duplicateCategory(id, name, parentID);
        onCompleted?.();
      }}
      onCancel={onCanceled}
      validName={(name) =>
        !findCategorySiblings(id)?.find((item) => item.name === name.trim())
      }
    />
  );
}
