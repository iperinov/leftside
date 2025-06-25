import { Button } from "@radix-ui/themes";
import type TreeItemData from "./TreeItemData";

interface AddTreeItemButtonProps<T extends TreeItemData<T>> {
  onAddLevel: (level: number, parent: T) => void;
  addLevelText: (level: number, parent: T) => string;
  isInProgress: boolean;
  level: number;
  parent: T;
}

export default function AddTreeItemButton<T extends TreeItemData<T>>({
  onAddLevel,
  addLevelText,
  level,
  parent,
  isInProgress,
}: AddTreeItemButtonProps<T>) {
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
