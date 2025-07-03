import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useState } from "react";
import type ItemData from "~/types/ItemData";
import MultiSelectDropdown from "../multiSelectDropdown/MultiSelectDropdown";
import type DialogBasicProps from "./DialogBasicProps";

interface MultiSelectDialogProps<T extends string | number>
  extends DialogBasicProps {
  items: ItemData<T>[];
  includeAllItem?: boolean;
  defaultSelectedIDs?: T[];
  onSelectionChange?: (selectedIDs: T[]) => void;
  onConfirm: (selectedIDs: T[]) => void;
  valid?: (values: T[]) => boolean;
}

export default function MultiSelectDialog<T extends string | number>({
  title,
  description,
  confirmText = "Confirm",
  destructive = false,
  cancelText = "Cancel",
  open = true,
  items,
  includeAllItem = false,
  defaultSelectedIDs = [],
  onConfirm,
  onSelectionChange = () => [],
  onCancel = () => {},
  valid = () => true,
}: MultiSelectDialogProps<T>) {
  const [isOpen, setIsOpen] = useState(open);
  const [selection, setSelection] = useState<T[]>(defaultSelectedIDs);

  const handleConfirm = () => {
    onConfirm(selection);
    setIsOpen(false);
  };

  const handleSelectionChange = (selectedIDs: T[]) => {
    setSelection(selectedIDs);
    onSelectionChange?.(selectedIDs);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      onCancel();
      setSelection(defaultSelectedIDs);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Content className={"customDialogContent"} size="3">
        {/* Title and description */}
        <Dialog.Title className={"customDialogTitle"}>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>

        {/* Input fields */}
        <MultiSelectDropdown
          items={items}
          defaultSelectedIDs={selection}
          onSelectionChange={handleSelectionChange}
          includeAllItem={includeAllItem}
        />

        {/* Buttons */}
        <Flex justify="end" gap="3" mt="4">
          <Dialog.Close>
            <Button onClick={onCancel} variant="soft">
              {cancelText}
            </Button>
          </Dialog.Close>
          <Button
            color={destructive ? "red" : undefined}
            onClick={handleConfirm}
            disabled={!valid(selection)}
          >
            {confirmText}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
