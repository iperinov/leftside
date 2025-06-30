import { Button, Dialog, Flex, Select } from "@radix-ui/themes";
import { useCallback, useState } from "react";
import type ItemData from "../categories/ItemData";

interface ItemTypeSelectProps {
  value?: string;
  items: ItemData<string>[];
  onChange?: (value: string) => void;
}

function SelectComponent({ value, items, onChange }: ItemTypeSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          {items.map((item) => (
            <Select.Item key={item.id} value={item.id}>
              {item.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

interface SelectDialogProps {
  title?: string;
  description?: string;
  confirmText?: string;
  destructive?: boolean;
  cancelText?: string;
  open?: boolean;
  items: ItemData<string>[];
  defaultSelectedID?: string;
  onConfirm: (selectedID: string) => void;
  onCancel?: () => void;
  valid?: (value: string) => boolean;
}

export default function SelectDialog({
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
}: SelectDialogProps) {
  const [selectedID, setSelectedID] = useState(defaultSelectedID);
  const [isOpen, setIsOpen] = useState(open);

  const handleConfirm = useCallback(() => {
    selectedID && onConfirm(selectedID);
    setIsOpen(false);
  }, [selectedID, open]);

  const handleSelectionChange = useCallback(
    (selectedID: string) => {
      console.log("SelectDialog handleSelectionChange", selectedID);
      setSelectedID(selectedID);
    },
    [selectedID]
  );

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
          <SelectComponent value={selectedID || ""} items={items} onChange={handleSelectionChange} />

          {/* Buttons */}
          <Flex justify="end" gap="3" mt="4">
            <Dialog.Close>
              <Button onClick={onCancel} variant="soft">
                {cancelText}
              </Button>
            </Dialog.Close>
            <Button color={destructive ? "red" : undefined} onClick={handleConfirm} disabled={selectedID ? !valid(selectedID) : true}>
              {confirmText}
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
