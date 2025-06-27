import { Box, Flex } from "@radix-ui/themes";

export default function SportsCatalogPage() {
  return (
    <Flex p="2" flexGrow="1">
      <Box
        flexGrow="1"
        style={{
          backgroundColor: "var(--gray-6)",
          borderTopRightRadius: "var(--radius-3)",
          borderBottomRightRadius: "var(--radius-3)",
        }}
      />
    </Flex>
  );
}
