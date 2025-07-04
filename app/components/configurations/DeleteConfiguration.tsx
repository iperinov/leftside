import { Button, Flex, Text } from "@radix-ui/themes";
import { useDeleteConfiguration } from "../../hooks/useDeleteConfiguration";
import { BaseDialog } from "../shared/BaseDialog";

export interface DeleteConfigurationProps {
  open: boolean;
  onClose: () => void;
  id: string;
  rev: string;
  name: string;
}

export const DeleteConfiguration = ({ open, onClose, id, rev, name }: DeleteConfigurationProps) => {
  const mutation = useDeleteConfiguration();

  const handleProceed = async () => {
    try {
      await mutation.mutateAsync({ uuid: id, rev });
      onClose();
    } catch (err) {
      console.error("Failed to delete configuration:", err);
    }
  };

  return (
    <BaseDialog open={open} onClose={onClose} title="Delete configuration" isProcessing={mutation.isPending} onConfirm={handleProceed}>
      <Flex direction="column" align="center" mb="4">
        <Text size="1" mb="3" className="iconCircle" style={{ color: "var(--accent-11)" }}>
          !
        </Text>
        <Text size="2" align="center" style={{ paddingTop: "1rem", color: "var(--accent-11)" }}>
          Are you sure you want to delete configuration <strong>'{name}'</strong>?
        </Text>
      </Flex>
    </BaseDialog>
  );
};
