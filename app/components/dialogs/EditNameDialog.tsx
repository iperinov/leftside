import { Button, Dialog, Text, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";

interface EditNameDialogProps {
  open?: boolean;
  onConfirm: (newName: string) => void;
  onCancel?: () => void;
  currentName?: string;
}

export default function EditNameDialog({ 
  open = true, 
  onConfirm, 
  onCancel = () => {}, 
  currentName = "" 
}: EditNameDialogProps) {
  const [isOpen, setIsOpen] = useState(open);
  const [name, setName] = useState(currentName);

  const handleRename = () => {
    onConfirm(name.trim());
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content style={{maxWidth: 400}} size="3">
        {/* Title and description */}
        <Dialog.Title>Rename Item</Dialog.Title>
        <Dialog.Description>Enter a new name below:</Dialog.Description>

        {/* Input fields */}
        <TextField.Root 
            value={name} 
            placeholder="New name" 
            mt="3"    
            onChange={(e) => setName(e.target.value)} 
        />

        {/* Buttons */}
        <Flex justify="end" gap="3" mt="4">
          <Dialog.Close>
            <Button onClick={onCancel} variant="soft"> Cancel </Button>
          </Dialog.Close>
          <Button onClick={handleRename} disabled={name === "" || name === currentName}> Rename </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
