import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, TextField } from "@radix-ui/themes";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Flex px="0" py="0" style={{ backgroundColor: "var(--accent-3)" }}>
      <TextField.Root
        placeholder="ctrl+k"
        size="2"
        variant="soft"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        style={{
          backgroundColor: "var(--accent-3)",
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
