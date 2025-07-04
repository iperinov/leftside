import { Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { CreateConfigApiSuccess } from "~/api/scs/configurations/config.types";
import { useCreateConfiguration } from "../../hooks/useCreateConfiguration";
import { BaseDialog } from "../shared/BaseDialog";

export interface CreateConfigurationProps {
  open: boolean;
  onClose: () => void;
}

export const CreateConfiguration = ({ open, onClose }: CreateConfigurationProps) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const mutation = useCreateConfiguration({
    onSuccess: (created: CreateConfigApiSuccess) => {
      toast.success("Configuration created successfully");
      navigate(`/configuration/${created.uuid}`, {
        state: {
          id: created.uuid,
          name: created.name,
          edit: true,
        },
      });
    },
    onError: () => {
      toast.error("Failed to create configuration");
    },
  });

  const handleCreate = () => {
    mutation.mutate({ name });
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  return (
    <BaseDialog
      open={open}
      onClose={handleClose}
      title="Create new configuration"
      isProcessing={mutation.isPending}
      disableConfirm={!name.trim()}
      onConfirm={handleCreate}
    >
      <Flex direction="column" gap="3" mb="4">
        <Text size="1" style={{ color: "var(--accent-11)", fontWeight: 500 }}>
          Title
        </Text>
        <TextField.Root value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter configuration name" variant="soft" className="inputField" />
      </Flex>
    </BaseDialog>
  );
};
