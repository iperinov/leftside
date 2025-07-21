
import { useState } from "react";
import { useRenameConfiguration } from "../../hooks/useRenameConfiguration";
import EditNameDialog from "../dialogs/EditNameDialog";
import LoadDataDecorator from "../loading/LoadDataDecorator";
import { useConfigurations } from "~/hooks/useConfigurations";

interface RenameConfigurationProps {
  open: boolean;
  onClose: () => void;
  uuid: string;
  rev: string;
}

export const RenameConfiguration = ({ open, onClose, uuid, rev }: RenameConfigurationProps) => {
  const [name, setName] = useState("");
  const renameConfiguration = useRenameConfiguration();
  const { data: configurations, isLoading, error } = useConfigurations();

  const handleConfirm = () => {
    // try {
    //   await mutation.mutateAsync({ uuid, rev, name });
    //   onClose();
    // } catch (err) {
    //   console.error("Failed to rename configuration:", err);
    // }
  };

  return (
    <LoadDataDecorator isLoading={isLoading || renameConfiguration.isPending} error={error}>
      <EditNameDialog
        title="Rename configuration"
        description="Enter a new name for the configuration:"
        confirmText="Rename"
        open={true}
        currentName={name}
        onConfirm={handleConfirm}
        onCancel={onClose}
        validName={(name) => !configurations?.find((item) => item.name === name.trim())}
      />
    </LoadDataDecorator>
  );
};
