import { Text } from "@radix-ui/themes";
import ScreenCenter from "../atoms/ScreenCenter";

const LoadingIndicator = () => (
  <ScreenCenter>
    <Text size="3" style={{ color: "var(--accent-11)" }}>
      Loading…
    </Text>
  </ScreenCenter>
);

export default LoadingIndicator;
