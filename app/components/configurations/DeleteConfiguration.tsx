
import { useDeleteConfiguration } from "../../hooks/useDeleteConfiguration";
import EditNameDialog from "../dialogs/EditNameDialog";

export interface DeleteConfigurationProps {
  open: boolean;
  onClose: () => void;
  id: string;
  rev: string;
  name: string;
}

export const DeleteConfiguration = ({ open, onClose, id, rev, name }: DeleteConfigurationProps) => {
  const mutation = useDeleteConfiguration();

  const handleConfirm = () => {
    // try {
    //   await mutation.mutateAsync({ uuid: id, rev });
    //   onClose();
    // } catch (err) {
    //   console.error("Failed to delete configuration:", err);
    // }
  };

  return (
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
  );
};
