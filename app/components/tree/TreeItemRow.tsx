import { CaretSortIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import DropdownContextMenu from "../dropdownContextMenu/DropdownContextMenu";
import type TreeItemData from "./TreeItemData";
import type TreeConfig from "./TreeConfig";

interface TreeItemRowProps {
  data: TreeItemData;
  parentID?: string;
}

export default function TreeItemRow({ data, parentID, ...config }: TreeItemRowProps & TreeConfig) {
  return (
    <Flex
      align="center"
      py="2"
      px="1"
      justify="between"
      width="100%"
      className={`
        ${config.selectedID === data.id ? "bg-[var(--accent-5)]" : "bg-[var(--accent-3)]"}
        hover:bg-[var(--accent-5)]
        rounded-md
        border
        border-[var(--accent-8)]
      `}
      onClick={() => config.onSelected && config.onSelected(parentID)}
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
