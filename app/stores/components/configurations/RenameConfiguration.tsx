import { useState } from "react";
import { toast } from "sonner";
import { useConfigurations } from "~/hooks/configuraitons/useConfigurations";
import { useRenameConfiguration } from "../../hooks/configuraitons/useRenameConfiguration";
import EditNameDialog from "../dialogs/EditNameDialog";
import LoadDataDecorator from "../loading/LoadDataDecorator";

interface RenameConfigurationProps {
  onClose: () => void;
  id: string;
  rev: string;
  name: string;
}

export const RenameConfiguration = ({ onClose, id, rev, name }: RenameConfigurationProps) => {
  const { data: configurations, isLoading, error } = useConfigurations();
  const renameConfiguration = useRenameConfiguration({
    onSuccess: (response) => {
      toast.success("Configuration renamed successfully");
    },
    onError: (error) => {
      toast.error("Failed to rename configuration");
      console.error(error);
    },
    onSettled: () => {
      onClose();
    },
  });
  const handleConfirm = (name: string) => {
    renameConfiguration.mutate({ path: { uuid: id }, body: { rev, name } });
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
