import TreeItem from "./TreeItem";
import { Flex } from "@radix-ui/themes";
import AddTreeItemButton from "./AddTreeItemButton";
import type TreeConfig from "./TreeConfig";
import type TreeItemData from "./TreeItemData";

interface TreeProps {
  rootItems: TreeItemData[];
}

export default function Tree({ rootItems, ...config }: TreeProps & TreeConfig) {
  return (
    <Flex direction={"column"} gap="2">
      {rootItems.map((item) => (
        <TreeItem key={item.id} data={item} crumbs={[]} {...config} />
      ))}
      {config.onAddLevel && <AddTreeItemButton onAddLevel={config.onAddLevel} crumbs={[]} />}
    </Flex>
  );
}
