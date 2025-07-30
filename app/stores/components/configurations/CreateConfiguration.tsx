import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { CreateConfigRequest, CreateConfigResponse } from "~/api/sccs/types.gen";
import { useConfigurations } from "~/hooks/configuraitons/useConfigurations";
import { useCreateConfiguration } from "~/hooks/configuraitons/useCreateConfiguration";
import EditNameDialog from "../dialogs/EditNameDialog";
import LoadDataDecorator from "../loading/LoadDataDecorator";

export interface CreateConfigurationProps {
  onClose: () => void;
}

export const CreateConfiguration = ({ onClose }: CreateConfigurationProps) => {
  const navigate = useNavigate();
  const { data: configurations, isLoading, error } = useConfigurations();

  const createConfig = useCreateConfiguration({
    onSuccess: (response: CreateConfigResponse, request: CreateConfigRequest) => {
      toast.success("Configuration created successfully");
      navigate(`/configuration/${response.uuid}`, {
        state: {
          id: response.uuid,
          edit: false,
        },
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create configuration");
      console.error(error);
    },
    onSettled: () => {
      onClose();
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
        onConfirm={handleConfirm}
        onCancel={onClose}
        validName={(name) => !configurations?.find((item) => item.name === name.trim())}
      />
    </LoadDataDecorator>
  );
};
