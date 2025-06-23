import { Button } from "@radix-ui/themes";
import formatOrdinal from "~/common/formatOrdinal";

interface AddTreeItemButtonProps {
  mutationInProgress?: boolean;
  onAddLevel: (parentID?: string) => void;
  level?: number;
  parentID?: string;
}

export default function AddTreeItemButton({ onAddLevel, level = 0, parentID = undefined, mutationInProgress = false }: AddTreeItemButtonProps) {
  return (
    <Button 
        onClick={() => onAddLevel(parentID)} 
        ml="5" 
        loading={mutationInProgress}
    >
      {`Add ${formatOrdinal(level + 1)} level`}
    </Button>
  );
}
