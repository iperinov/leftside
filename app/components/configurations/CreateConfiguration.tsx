import { Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useCreateConfiguration } from "../../hooks/useCreateConfiguration";
import { BaseDialog } from "../shared/BaseDialog";

export interface CreateConfigurationProps {
  open: boolean;
  onClose: () => void;
}

export const CreateConfiguration = ({
  open,
  onClose,
}: CreateConfigurationProps) => {
  const [name, setName] = useState("");
  const mutation = useCreateConfiguration();

  const handleCreate = async () => {
    try {
      await mutation.mutateAsync({ name });
      setName("");
      onClose();
    } catch (err) {
      console.error("Failed to create configuration:", err);
    }
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title="Create new configuration"
      isProcessing={mutation.isPending}
      disableConfirm={!name.trim()}
      onConfirm={handleCreate}
    >
      <Flex direction="column" gap="3" mb="4">
        <Text size="1" color="gray" style={{ fontWeight: 500 }}>
          Title
        </Text>
        <TextField.Root
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter configuration name"
          variant="soft"
          className="inputField"
        />
      </Flex>
    </BaseDialog>
  );
};
