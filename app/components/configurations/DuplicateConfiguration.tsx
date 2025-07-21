
import { useDuplicateConfiguration } from "../../hooks/useDuplicateConfiguration";
import LoadDataDecorator from "../loading/LoadDataDecorator";
import EditNameDialog from "../dialogs/EditNameDialog";
import { useConfigurations } from "~/hooks/useConfigurations";

export interface DuplicateConfigurationProps {
  open: boolean;
  onClose: () => void;
  id: string;
  rev: string;
  name: string;
}

export const DuplicateConfiguration = ({ open, onClose, id, rev, name }: DuplicateConfigurationProps) => {
  const duplicateConfiguration = useDuplicateConfiguration();
  const { data: configurations, isLoading, error } = useConfigurations();

  const handleConfirm = (name: string) => {
    // try {
    //   await mutation.mutateAsync({ uuid: id, rev });
    //   onClose();
    // } catch (err) {
    //   console.error("Failed to duplicate configuration:", err);
    // }
  };

  return (
    <LoadDataDecorator isLoading={isLoading /*|| duplicateConfiguration.isPending*/} error={error}>
      <EditNameDialog
        title="Duplicate category"
        description="Enter a new name for the duplicated category:"
        confirmText="Duplicate"
        open={true}
        currentName={name}
        onConfirm={handleConfirm}
        onCancel={onClose}
        validName={(name) => !configurations?.find((item) => item.name === name.trim())}
      />
    </LoadDataDecorator>
  );
};
