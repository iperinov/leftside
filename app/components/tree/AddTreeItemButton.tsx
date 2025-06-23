import { Button } from "@radix-ui/themes";
import formatOrdinal from "~/common/formatOrdinal";

interface AddTreeItemButtonProps {
  onAddLevel: (parentIDs: string[]) => void;
  crumbs: string[];
}

export default function AddTreeItemButton({ onAddLevel, crumbs = [] }: AddTreeItemButtonProps) {
  return (
    <Button onClick={() => onAddLevel(crumbs)} ml="5">
      {`Add ${formatOrdinal(crumbs.length + 1)} level`}
    </Button>
  );
}
