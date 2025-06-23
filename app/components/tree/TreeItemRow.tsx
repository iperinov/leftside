import { CaretSortIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import DropdownContextMenu from "../dropdownContextMenu/DropdownContextMenu";
import type TreeItemData from "./TreeItemData";
import type TreeConfig from "./TreeConfig";
import styles from "./TreeItemRow.module.css"; // Assuming you have a CSS file for tree styles

interface TreeItemRowProps {
  data: TreeItemData;
  parentID?: string;
  level: number;
}

export default function TreeItemRow({ data, parentID, level, ...config }: TreeItemRowProps & TreeConfig) {
  const isSelectable = config.selectionEnabledOnLevels.includes(level);
    return (
    <Flex
      align="center"
      py="2"
      px="1"
      justify="between"
      width="100%"
      className={styles.treeItemRow}
      onClick={ isSelectable ? () => config.onSelected && config.onSelected(parentID) : undefined}
      draggable="true"
      data-selectable={isSelectable ? "true" : undefined}
      data-selected={config.selectedID === data.id ? "true" : undefined}
    >
      <Flex align="center" gap="1">
        {/* Reorder Button */}
        <Button
          data-disabled="true"
          style={{ cursor: "inherit" }}
          variant="ghost"
          onClick={(event) => {
            event.stopPropagation();
            console.log("Sort clicked");
          }}
        >
          <CaretSortIcon />
        </Button>

        {/* Name */}
        <Text wrap="pretty">{data.name}</Text>

        {/* Flags */}
      </Flex>

      {/* Context menu */}
      {config.menuItems && config.menuItems.length > 0 && (
        <Box pr="3" pl="2">
          <DropdownContextMenu items={config.menuItems} context={data.id} />
        </Box>
      )}
    </Flex>
  );
}
