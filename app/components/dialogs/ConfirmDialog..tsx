import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import type DialogBasicProps from "./DialogBasicProps";

interface ConfirmDialogProps extends DialogBasicProps {
  onConfirm: () => void;
}

export default function ConfirmDialog({
  title = "Confirm",
  description = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  destructive = false,
  cancelText = "Cancel",
  open = true,
  onConfirm,
  onCancel = () => {},
}: ConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(open);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      onCancel();
    }
  };

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">{description}</AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" onClick={onCancel} style={{ color: "var(--accent-11)" }}>
              {cancelText}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color={destructive ? "red" : undefined} onClick={onConfirm}>
              {confirmText}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
