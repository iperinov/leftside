import { Button, Flex } from "@radix-ui/themes";
import type ClassNameProps from "../shared/ClassNameProps";

interface ConfigurationHeaderProps {
  onCancel?: () => void;
  onSave: () => void;
  isProcessing?: boolean;
}

export default function ConfigurationHeader({ onCancel, onSave, isProcessing, className }: ConfigurationHeaderProps & ClassNameProps) {
  return (
    <Flex justify="end" gap="3" className={className}>
      <Button variant="ghost" style={{ color: "white" }} onClick={onCancel} className="buttonGhost" disabled={isProcessing}>
        Cancel
      </Button>
      <Button variant="ghost" style={{ color: "white" }} onClick={onSave} className="buttonGhost" disabled={isProcessing}>
        {isProcessing ? "Saving..." : "Save changes"}
      </Button>
    </Flex>
  );
}
