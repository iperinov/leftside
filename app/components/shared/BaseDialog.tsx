import * as Dialog from "@radix-ui/react-dialog";
import { Button, Flex, Theme } from "@radix-ui/themes";
import type React from "react";

export interface BaseDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmLabel?: string;
  cancelLabel?: string;
  backLabel?: string;
  isProcessing?: boolean;
  disableConfirm?: boolean;
  children: React.ReactNode;

  renderActionsStart?: React.ReactNode;
  onBack?: () => void;
  showCancel?: boolean;

  width?: string | number;
}

export const BaseDialog: React.FC<BaseDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  confirmLabel = "Proceed",
  cancelLabel = "Cancel",
  backLabel = "Back",
  isProcessing = false,
  disableConfirm = false,
  children,
  renderActionsStart,
  onBack,
  showCancel = true,
  width, // 👈 destructure the new prop
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Theme asChild>
          <Dialog.Overlay className="dialogOverlay" />
        </Theme>
        <Theme asChild>
          <Dialog.Content
            className="dialogContent"
            aria-describedby={undefined}
            style={{
              ...(width ? { width } : {}),
            }}
          >
            <Dialog.Title className="dialogTitle">{title}</Dialog.Title>

            {children}

            <Flex
              justify="between"
              align="center"
              style={{ paddingTop: "1rem" }}
            >
              {/* Left side */}
              {renderActionsStart ?? <span />}

              {/* Right side buttons */}
              <Flex gap="4">
                {showCancel && (
                  <Button
                    variant="ghost"
                    color="gray"
                    onClick={onClose}
                    disabled={isProcessing}
                    className="buttonGhost"
                  >
                    {cancelLabel}
                  </Button>
                )}

                {onBack && (
                  <Button
                    variant="ghost"
                    color="gray"
                    onClick={onBack}
                    disabled={isProcessing}
                    className="buttonGhost"
                  >
                    {backLabel}
                  </Button>
                )}

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
            </Flex>
          </Dialog.Content>
        </Theme>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
