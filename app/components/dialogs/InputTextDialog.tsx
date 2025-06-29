import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import React, { useState } from "react";

export interface InputTextDialogProps {
  title?: string;
  description?: string;
  confirmText?: string;
  destructive?: boolean;
  cancelText?: string;
  open?: boolean;
  defaultInput?: string;
  placeholder?: string;
  onConfirm: (input: string) => void;
  onCancel?: () => void;
  valid?: (input: string) => boolean;
}

interface TemplateInputTextDialogProps {
  as?: React.ElementType;
}

export default function InputTextDialog ({
  title = "Edit Name",
  description = "Enter a new name below:",
  confirmText = "Confirm",
  destructive = false,
  cancelText = "Cancel",
  open = true,
  defaultInput = "",
  placeholder = "",
  onConfirm,
  onCancel = () => {},
  valid = (input) => true,
  as = TextField.Root
}: InputTextDialogProps & TemplateInputTextDialogProps) {
  const [isOpen, setIsOpen] = useState(open);
  const [input, setInput] = useState(defaultInput);

  const confirmChange = () => {
    onConfirm(input.trim());
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className={"customDialogContent"} size="3">
        {/* Title and description */}
        <Dialog.Title className={"customDialogTitle"}>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>

        {React.createElement(as, {
          value: input,
          placeholder: placeholder,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
          style: { marginTop: "1rem", width: "100%" }
        })}

        {/* Buttons */}
        <Flex justify="end" gap="3" mt="4">
          <Dialog.Close>
            <Button onClick={onCancel} variant="soft">
              {cancelText}
            </Button>
          </Dialog.Close>
          <Button color={destructive ? "red" : undefined} onClick={confirmChange} disabled={!valid(input)}>
            {confirmText}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
