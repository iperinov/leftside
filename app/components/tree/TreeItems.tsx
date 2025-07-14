import type TreeConfig from "./TreeConfig";
import type TreeItemData from "./TreeItemData";
import TreeItem from "./TreeItem";

interface TreeItemsProps<T extends TreeItemData<T>> {
  root: T;
  level: number;
}

export default function TreeItems<T extends TreeItemData<T>>({ root, level, ...config }: TreeItemsProps<T> & TreeConfig<T>) {
  return (
    root.children?.map((child) => <TreeItem key={child.id} item={child} level={level} parent={root} {...config} />)
  );
}
