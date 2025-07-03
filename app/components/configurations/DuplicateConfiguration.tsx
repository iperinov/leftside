import { Flex, Text } from "@radix-ui/themes";
import { useDuplicateConfiguration } from "../../hooks/useDuplicateConfiguration";
import { BaseDialog } from "../shared/BaseDialog";

export interface DuplicateConfigurationProps {
  open: boolean;
  onClose: () => void;
  id: string;
  rev: string;
  name: string;
}

export const DuplicateConfiguration = ({
  open,
  onClose,
  id,
  rev,
  name,
}: DuplicateConfigurationProps) => {
  const mutation = useDuplicateConfiguration();

  const handleProceed = async () => {
    try {
      await mutation.mutateAsync({ uuid: id, rev });
      onClose();
    } catch (err) {
      console.error("Failed to duplicate configuration:", err);
    }
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title="Duplicate configuration"
      isProcessing={mutation.isPending}
      onConfirm={handleProceed}
    >
      <Flex direction="column" align="center" mb="4">
        <Text
          size="1"
          mb="3"
          className="iconCircle"
          style={{ color: "var(--accent-11)" }}
        >
          !
        </Text>
        <Text
          size="2"
          align="center"
          style={{ color: "var(--accent-11)", paddingTop: "1rem" }}
        >
          Are you sure you want to duplicate configuration{" "}
          <strong>'{name}'</strong>?
        </Text>
      </Flex>
    </BaseDialog>
  );
};
