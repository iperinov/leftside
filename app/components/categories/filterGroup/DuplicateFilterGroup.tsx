import ConfirmDialog from "~/components/dialogs/ConfirmDialog.";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";

interface DuplicateFilterGroupProps {
  categoryUUID: string;
  filterGroupUUID: string;
  onCompleted?: () => void;
  onCanceled?: () => void;
}

export default function DuplicateFilterGroup({ categoryUUID, filterGroupUUID, onCompleted, onCanceled }: DuplicateFilterGroupProps) {
  const duplicateFilterGroup = useCategoryTreeStore((state) => state.duplicateFilterGroup);
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);

  return (
    <ConfirmDialog
      title="Duplicate filter group"
      description="Are you sure you want to duplicate this filter group?"
      confirmText="Duplicate"
      open={true}
      onConfirm={() => {
        duplicateFilterGroup(categoryUUID, filterGroupUUID);
        onCompleted?.();
      }}
      onCancel={onCanceled}
    />
  );
}
