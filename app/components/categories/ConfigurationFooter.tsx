import { Button, Flex } from "@radix-ui/themes";
import type ClassNameProps from "../shared/ClassNameProps";

interface ConfigurationHeaderProps {
  onCanceled?: () => void;
  onCompleted?: () => void;
  isProcessing?: boolean;
}

export default function ConfigurationHeader({ onCanceled, onCompleted, isProcessing, className }: ConfigurationHeaderProps & ClassNameProps) {
  return (
    <Flex justify="end" gap="3" className={className}>
      <Button
        variant="ghost"
        style={{ color: "white" }}
        onClick={onCanceled}
        className="buttonGhost"
        disabled={isProcessing} //TODO: Implement
      >
        Cancel
      </Button>
      <Button
        variant="ghost"
        style={{ color: "white" }}
        onClick={onCompleted}
        className="buttonGhost"
        disabled={isProcessing} //TODO: Implement
      >
        {isProcessing ? "Processing…" : "Save changes"}
      </Button>
    </Flex>
  );
}
