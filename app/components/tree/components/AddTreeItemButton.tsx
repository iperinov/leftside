import { Button } from "@radix-ui/themes";
import type TreeItemData from "../common/TreeItemData";

interface AddTreeItemButtonProps {
  onAddLevel: (level: number, parent: TreeItemData) => void;
  addLevelText: (level: number, parent: TreeItemData) => string;
  isInProgress: boolean;
  level: number;
  parent: TreeItemData;
}

export default function AddTreeItemButton({ onAddLevel, addLevelText, level, parent, isInProgress }: AddTreeItemButtonProps) {
  return (
    <Button 
        onClick={() => onAddLevel(level, parent)} 
        ml="5" 
        loading={isInProgress}
    >
      {addLevelText(level, parent)}
    </Button>
  );
}
