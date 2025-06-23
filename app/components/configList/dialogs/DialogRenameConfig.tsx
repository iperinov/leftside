import { useState, type ReactNode } from "react";
import { Dialog, TextField, Text, Flex, Button } from "@radix-ui/themes/components/index";

interface DialogRenameConfigProps {
  currentName: string;
  onClose: (newName: string) => void;
}

export default function DialogRenameConfig({currentName, onClose}: DialogRenameConfigProps): ReactNode {
  const [name, setName] = useState(currentName);

  return (
    <Dialog.Root open={true} onOpenChange={(open) => !open && onClose(name)}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Rename</Dialog.Title>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root value={name} onChange={(event) => setName(event.currentTarget.value)}/>
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}