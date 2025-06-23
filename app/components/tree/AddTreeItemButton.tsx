import { Button } from "@radix-ui/themes";
import formatOrdinal from "~/common/formatOrdinal";

interface AddTreeItemButtonProps {
  onAddLevel: (parentIDs: string[]) => void;
  parentIDs: string[];
}

export default function AddTreeItemButton({ onAddLevel, parentIDs = [] }: AddTreeItemButtonProps) {
  return (
    <Button onClick={() => onAddLevel(parentIDs)} ml="5">
      {`Add ${formatOrdinal(parentIDs.length)} level`}
    </Button>
  );
}
