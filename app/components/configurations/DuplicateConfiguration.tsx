import * as Dialog from "@radix-ui/react-dialog";
import { Button, Flex, Text } from "@radix-ui/themes";
import type React from "react";
import { useDuplicateConfiguration } from "../../hooks/useDuplicateConfiguration";

export interface DuplicateConfigurationProps {
  open: boolean;
  onClose: () => void;
  id: string;
  rev: string;
  name: string;
}

export const DuplicateConfiguration: React.FC<DuplicateConfigurationProps> = ({
  open,
  onClose,
  id,
  rev,
  name,
}) => {
  const duplicate = useDuplicateConfiguration();

  const handleProceed = async () => {
    try {
      await duplicate.mutateAsync({ uuid: id, rev });
      onClose();
    } catch (err) {
      console.error("Failed to duplicate configuration:", err);
      // TODO: show toast error
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialogOverlay" />
        <Dialog.Content className="dialogContent" aria-describedby={undefined}>
          <Dialog.Title className="dialogTitle">
            Duplicate configuration
          </Dialog.Title>

          <Flex direction="column" align="center" mb="4">
            <Text size="1" color="gray" mb="3" className="iconCircle">
              !
            </Text>
            <Text
              size="2"
              align="center"
              color="gray"
              style={{ paddingTop: "1rem" }}
            >
              Are you sure you want to duplicate configuration{" "}
              <strong>'{name}'</strong>?
            </Text>
          </Flex>

          <Flex justify="end" gap="4" style={{ paddingTop: "1rem" }}>
            <Button
              variant="ghost"
              color="gray"
              onClick={onClose}
              disabled={duplicate.isPending}
              className="buttonGhost"
            >
              Cancel
            </Button>
            <Button
              variant="ghost"
              color="gray"
              onClick={handleProceed}
              disabled={duplicate.isPending}
              className="buttonGhost"
            >
              {duplicate.isPending ? "Processing…" : "Proceed"}
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
