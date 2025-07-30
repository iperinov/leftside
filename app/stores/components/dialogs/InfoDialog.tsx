import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import type DialogBasicProps from "./DialogBasicProps";

interface InfoDialogProps extends DialogBasicProps {
  onClose: () => void;
}

export default function InfoDialog({ title, description, open = true, onClose = () => {} }: InfoDialogProps) {
  const [isOpen, setIsOpen] = useState(open);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      onClose();
    }
  };

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">{description}</AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" onClick={onClose}>
              Close
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
