import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";

interface ConfirmDialogProps {
  open?: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function ConfirmDialog({
  open = true,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel = () => {},
}: ConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content style={{ maxWidth: 400 }}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{message}</Dialog.Description>

        <Flex justify="end" gap="3" mt="4">
          <Dialog.Close>
            <Button onClick={onCancel} variant="soft">{cancelText}</Button>
          </Dialog.Close>

          <Button onClick={onConfirm}> {confirmText} </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
