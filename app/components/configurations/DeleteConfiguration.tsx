import { toast } from "sonner";
import { useDeleteConfiguration } from "../../hooks/configuraitons/useDeleteConfiguration";
import EditNameDialog from "../dialogs/EditNameDialog";
import LoadDataDecorator from "../loading/LoadDataDecorator";

export interface DeleteConfigurationProps {
  onClose: () => void;
  id: string;
  rev: string;
  name: string;
}

export const DeleteConfiguration = ({ onClose, id, rev, name }: DeleteConfigurationProps) => {
  const deleteConfig = useDeleteConfiguration({
    onSuccess: (response) => {
      toast.success("Configuration deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete configuration");
      console.error(error);
    },
    onSettled: () => {
      onClose();
    },
  });

  const handleConfirm = () => {
    deleteConfig.mutate({ path: { uuid: id }, body: { rev } });
  };

  return (
    <LoadDataDecorator isLoading={deleteConfig.isPending}>
      <EditNameDialog
        title="Delete configuration"
        description={`Enter 'DELETE' to delete ${name} configuration:`}
        confirmText="Delete"
        destructive={true}
        open={true}
        onConfirm={handleConfirm}
        onCancel={onClose}
        validName={(name) => name.trim() === "DELETE"}
      />
    </LoadDataDecorator>
  );
};
