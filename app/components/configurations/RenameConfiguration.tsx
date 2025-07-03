import { Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useRenameConfiguration } from "../../hooks/useRenameConfiguration";
import { BaseDialog } from "../shared/BaseDialog";

interface RenameConfigurationProps {
  open: boolean;
  onClose: () => void;
  uuid: string;
  rev: string;
}

export const RenameConfiguration = ({
  open,
  onClose,
  uuid,
  rev,
}: RenameConfigurationProps) => {
  const [name, setName] = useState("");
  const mutation = useRenameConfiguration();

  const handleRename = async () => {
    try {
      await mutation.mutateAsync({ uuid, rev, name });
      onClose();
    } catch (err) {
      console.error("Failed to rename configuration:", err);
    }
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title="Rename configuration"
      isProcessing={mutation.isPending}
      disableConfirm={!name.trim()}
      onConfirm={handleRename}
    >
      <Flex direction="column" gap="3" mb="4">
        <Text size="1" style={{ color: "var(--accent-7)", fontWeight: 500 }}>
          Title
        </Text>
        <TextField.Root
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new name"
          variant="soft"
          className="inputField"
        />
      </Flex>
    </BaseDialog>
  );
};
