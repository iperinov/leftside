import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, TextField } from "@radix-ui/themes";

export default function SearchBar() {
  return (
    <Flex px="0" py="0" style={{ backgroundColor: "var(--gray-3)" }}>
      <TextField.Root
        placeholder="Search"
        size="2"
        variant="soft"
        style={{
          backgroundColor: "var(--gray-3)",
          width: "100%",
          boxShadow: "none",
        }}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
}
