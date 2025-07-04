import ConfirmDialog from "~/components/dialogs/ConfirmDialog.";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";

interface DuplicateFilterGroupProps {
  categoryID: string;
  filterGroupID: string;
  onCompleted?: () => void;
  onCanceled?: () => void;
}

export default function DuplicateFilterGroup({ categoryID, filterGroupID, onCompleted, onCanceled }: DuplicateFilterGroupProps) {
  const duplicateFilterGroup = useCategoryTreeStore((state) => state.duplicateFilterGroup);
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);

  return (
    <ConfirmDialog
      title="Duplicate filter group"
      description="Are you sure you want to duplicate this filter group?"
      confirmText="Duplicate"
      open={true}
      onConfirm={() => {
        duplicateFilterGroup(categoryID, filterGroupID);
        onCompleted?.();
      }}
      onCancel={onCanceled}
    />
  );
}
