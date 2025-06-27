import * as Dialog from "@radix-ui/react-dialog";
import { Button, Flex } from "@radix-ui/themes";
import type React from "react";

export interface BaseDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isProcessing?: boolean;
  disableConfirm?: boolean;
  children: React.ReactNode;
}

export const BaseDialog: React.FC<BaseDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  confirmLabel = "Proceed",
  cancelLabel = "Cancel",
  isProcessing = false,
  disableConfirm = false,
  children,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialogOverlay" />
        <Dialog.Content className="dialogContent" aria-describedby={undefined}>
          <Dialog.Title className="dialogTitle">{title}</Dialog.Title>

          {children}

          <Flex justify="end" gap="4" style={{ paddingTop: "1rem" }}>
            <Button
              variant="ghost"
              color="gray"
              onClick={onClose}
              disabled={isProcessing}
              className="buttonGhost"
            >
              {cancelLabel}
            </Button>
            <Button
              variant="ghost"
              color="gray"
              onClick={onConfirm}
              disabled={isProcessing || disableConfirm}
              className="buttonGhost"
            >
              {isProcessing ? "Processing…" : confirmLabel}
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
