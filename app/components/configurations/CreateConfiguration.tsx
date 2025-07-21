import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { CreateConfigResponse } from "~/api/sccs/types.gen";
import { useCreateConfiguration } from "~/hooks/useCreateConfiguration";
import EditNameDialog from "../dialogs/EditNameDialog";
import { useConfigurations } from "~/hooks/useConfigurations";
import LoadDataDecorator from "../loading/LoadDataDecorator";

export interface CreateConfigurationProps {
  open: boolean;
  onClose: () => void;
}

export const CreateConfiguration = ({ open, onClose }: CreateConfigurationProps) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { data: configurations, isLoading, error } = useConfigurations();

  const createConfig = useCreateConfiguration({
    onSuccess: (response: CreateConfigResponse) => {
      toast.success("Configuration created successfully");
      navigate(`/configuration/${response.uuid}`, {
        state: {
          id: response.uuid,
          name: name,
          edit: false,
        },
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create configuration");
      console.error(error);
    },
  });

  const handleConfirm = (name: string) => {
    createConfig.mutate({ body: { name: name.trim() } });
  };

  return (
    <LoadDataDecorator isLoading={isLoading || createConfig.isPending} error={error}>
      <EditNameDialog
        title="Create new configuration"
        description="Enter a name for the configuration:"
        confirmText="Create"
        open={true}
        currentName={name}
        onConfirm={handleConfirm}
        onCancel={onClose}
        validName={(name) => !configurations?.find((item) => item.name === name.trim())}
      />
    </LoadDataDecorator>
  );
};
