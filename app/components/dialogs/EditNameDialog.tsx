import { Button, Dialog, Text, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";

interface EditNameDialogProps {
  title?: string;
  description?: string;
  confirmText?: string;
  destructive?: boolean;
  cancelText?: string;
  open?: boolean;
  currentName?: string; 
  onConfirm: (name: string) => void;
  onCancel?: () => void;
  validName?: (name: string) => boolean;
}

export default function EditNameDialog({ 
  title = "Edit Name",
  description = "Enter a new name below:",
  confirmText = "Confirm",
  destructive = false,
  cancelText = "Cancel",
  open = true, 
  currentName = "", 
  onConfirm,
  onCancel = () => {}, 
  validName = (name) => true 
}: EditNameDialogProps) {
  const [isOpen, setIsOpen] = useState(open);
  const [name, setName] = useState(currentName);

  const handleRename = () => {
    onConfirm(name.trim());
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className={"customDialogContent"} size="3">
        {/* Title and description */}
        <Dialog.Title className={"customDialogTitle"}>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>

        {/* Input fields */}
        <TextField.Root value={name} placeholder="New name" mt="3" onChange={(e) => setName(e.target.value)} />

        {/* Buttons */}
        <Flex justify="end" gap="3" mt="4">
          <Dialog.Close>
            <Button onClick={onCancel} variant="soft">
              {cancelText}
            </Button>
          </Dialog.Close>
          <Button 
            color={destructive ? "red" : undefined} 
            onClick={handleRename} 
            disabled={name === "" || name === currentName || !validName(name)}>
            {confirmText}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
