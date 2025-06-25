import * as Dialog from "@radix-ui/react-dialog";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import type React from "react";
import { useState } from "react";
import { useRenameConfiguration } from "../../hooks/useRenameConfiguration";

interface RenameConfigurationProps {
  open: boolean;
  onClose: () => void;
  uuid: string;
  rev: string;
}

export const RenameConfiguration: React.FC<RenameConfigurationProps> = ({
  open,
  onClose,
  uuid,
  rev,
}) => {
  const rename = useRenameConfiguration();
  const [name, setName] = useState("");

  const handleRename = async () => {
    try {
      await rename.mutateAsync({ uuid: uuid, rev, name });
      onClose();
    } catch (err) {
      console.error("Failed to rename configuration:", err);
      // TODO: show toast error
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialogOverlay" />
        <Dialog.Content className="dialogContent" aria-describedby={undefined}>
          <Dialog.Title className="dialogTitle">
            Rename configuration
          </Dialog.Title>

          <Flex direction="column" gap="3" mb="4">
            <Text size="1" color="gray" style={{ fontWeight: 500 }}>
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

          <Flex justify="end" gap="4" style={{ paddingTop: "1rem" }}>
            <Button
              variant="ghost"
              color="gray"
              onClick={onClose}
              disabled={rename.isPending}
              className="buttonGhost"
            >
              Cancel
            </Button>
            <Button
              variant="ghost"
              color="gray"
              onClick={handleRename}
              disabled={rename.isPending || !name.trim()}
              className="buttonGhost"
            >
              {rename.isPending ? "Processing…" : "Proceed"}
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
