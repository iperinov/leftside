import * as Dialog from "@radix-ui/react-dialog";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useCreateConfiguration } from "../../hooks/useCreateConfiguration";

export interface CreateConfigurationProps {
  open: boolean;
  onClose: () => void;
}

export const CreateConfiguration = ({
  open,
  onClose,
}: CreateConfigurationProps) => {
  const [name, setName] = useState("");
  const create = useCreateConfiguration();

  const handleProceed = async () => {
    try {
      await create.mutateAsync({ name: name });
      setName("");
      onClose();
    } catch (err) {
      console.error("Failed to create configuration:", err);
      // TODO: show toast error
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialogOverlay" />
        <Dialog.Content className="dialogContent" aria-describedby={undefined}>
          <Dialog.Title className="dialogTitle">
            Create new configuration
          </Dialog.Title>

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

          <Flex justify="end" gap="4" mt="3" style={{ paddingTop: "1rem" }}>
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={create.isPending}
              color="gray"
              size="1"
              className="buttonGhost"
            >
              Cancel
            </Button>
            <Button
              variant="ghost"
              onClick={handleProceed}
              disabled={create.isPending || !name.trim()}
              color="gray"
              size="1"
              className="buttonGhost"
            >
              {create.isPending ? "Processing…" : "Proceed"}
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
