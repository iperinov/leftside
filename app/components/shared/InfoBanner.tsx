import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text } from "@radix-ui/themes";

interface InfoBannerProps {
  description: string;
}

export default function InfoBanner({ description }: InfoBannerProps) {
  return (
    <Box
      style={{
        border: "1px solid var(--accent-7)",
        borderRadius: "6px",
        backgroundColor: "var(--accent-2)",
        padding: "0.75rem 1rem",
        color: "var(--accent-11)",
      }}
    >
      <Flex gap="2" align="center">
        <InfoCircledIcon />
        <Text size="2">{description}</Text>
      </Flex>
    </Box>
  );
}
