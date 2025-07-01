import { CheckIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text } from "@radix-ui/themes";
import { Fragment, useState } from "react";

interface SingleSelectProps<T> {
  items: T[];
  selectedId: string | null;
  onSelect: (item: T) => void;
  renderLabel: (item: T) => string;
  getId: (item: T) => string;
}

export function SingleSelect<T>({
  items,
  selectedId,
  onSelect,
  renderLabel,
  getId,
}: SingleSelectProps<T>) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <Box
      style={{
        height: "450px",
        overflowY: "auto",
        borderRadius: "var(--radius-2)",
        border: "1px solid var(--gray-4)",
        padding: "0",
      }}
    >
      {items.map((item, index) => {
        const id = getId(item);
        const isSelected = id === selectedId;
        const isHovered = id === hoveredId;

        const backgroundColor = isSelected
          ? "var(--gray-6)"
          : isHovered
            ? "var(--gray-6)"
            : "transparent";

        return (
          <Fragment key={id}>
            <Flex
              align="center"
              gap="1"
              px="3"
              style={{
                cursor: "pointer",
                borderRadius: "var(--radius-2)",
                backgroundColor,
                transition: "background-color 0.2s",
                paddingTop: "0.25rem",
                paddingBottom: "0.25rem",
              }}
              onClick={() => onSelect(item)}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Box
                style={{
                  borderTop: "1px solid var(--gray-9)",
                  // marginInline: "0.5rem",
                }}
              />
              <Box style={{ width: "30px" }}>
                {isSelected && <CheckIcon width={16} height={16} />}
              </Box>

              <Text>{renderLabel(item)}</Text>
            </Flex>

            {index < items.length - 1 && (
              <Box
                style={{
                  borderTop: "1px solid var(--gray-9)",
                }}
              />
            )}
          </Fragment>
        );
      })}
    </Box>
  );
}
