import { Button, Dialog, Flex, Select } from "@radix-ui/themes";
import { useCallback, useState } from "react";
import type ItemData from "~/types/ItemData";
import SelectComponent from "../shared/SelectComponent";
import type DialogBasicProps from "./DialogBasicProps";

interface SelectDialogProps<T extends string | number> extends DialogBasicProps {
  items: ItemData<T>[];
  defaultSelectedID?: T;
  onConfirm: (selectedID?: T) => void;
  valid?: (value: T) => boolean;
}

export default function SelectDialog<T extends string | number>({
  title,
  description,
  confirmText = "Confirm",
  destructive = false,
  cancelText = "Cancel",
  open = true,
  items,
  defaultSelectedID,
  onConfirm,
  onCancel = () => {},
  valid = () => true,
}: SelectDialogProps<T>) {
  const [selectedID, setSelectedID] = useState(defaultSelectedID);
  const [isOpen, setIsOpen] = useState(open);

  const handleConfirm = () => {
    onConfirm(selectedID);
    setIsOpen(false);
  };

  const handleSelectionChange = (selectedID?: T) => {
    setSelectedID(selectedID);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      onCancel();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Content className={"customDialogContent"} size="3">
        {/* Title and description */}
        <Flex direction="column">
          <Dialog.Title className={"customDialogTitle"}>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>

          {/* Input fields */}
          <SelectComponent value={selectedID} items={items} onChange={handleSelectionChange} />

          {/* Buttons */}
          <Flex justify="end" gap="3" mt="4">
            <Dialog.Close>
              <Button onClick={onCancel} variant="soft">
                {cancelText}
              </Button>
            </Dialog.Close>
            <Button color={destructive ? "red" : undefined} onClick={handleConfirm} disabled={selectedID !== undefined ? !valid(selectedID) : true}>
              {confirmText}
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
