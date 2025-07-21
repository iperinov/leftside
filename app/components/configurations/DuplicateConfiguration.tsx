import { useDuplicateConfiguration } from "../../hooks/configuraitons/useDuplicateConfiguration";
import LoadDataDecorator from "../loading/LoadDataDecorator";
import EditNameDialog from "../dialogs/EditNameDialog";
import { useConfigurations } from "~/hooks/configuraitons/useConfigurations";
import { toast } from "sonner";

export interface DuplicateConfigurationProps {
  onClose: () => void;
  id: string;
  name: string;
}

export const DuplicateConfiguration = ({ onClose, id, name }: DuplicateConfigurationProps) => {
  const { data: configurations, isLoading, error } = useConfigurations();
  const duplicateConfiguration = useDuplicateConfiguration({
    onSuccess: (response) => {
      toast.success("Configuration duplicated successfully");
    },
    onError: (error) => {
      toast.error("Failed to duplicate configuration");
      console.error(error);
    },
    onSettled: () => {
      onClose();
    },
  });

  const handleConfirm = (name: string) => {
    duplicateConfiguration.mutate({
      path: { uuid: id },
      body: { name },
    });
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
