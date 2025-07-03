import { Box, Flex } from "@radix-ui/themes";
import CatalogView from "~/components/catalogue/CatalogView";

export default function SportsCatalogPage() {
  return (
    <Flex p="2" flexGrow="1">
      <CatalogView />
      <Box
        flexGrow="1"
        style={{
          backgroundColor: "var(--accent-6)",
          borderTopRightRadius: "var(--radius-3)",
          borderBottomRightRadius: "var(--radius-3)",
        }}
      />
    </Flex>
  );
}
