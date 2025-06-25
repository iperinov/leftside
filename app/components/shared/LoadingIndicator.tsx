import { Text } from "@radix-ui/themes";
import ScreenCenter from "../atoms/ScreenCenter";

const LoadingIndicator = () => (
  <ScreenCenter>
    <Text size="3" color="gray">
      Loading…
    </Text>
  </ScreenCenter>
);

export default LoadingIndicator;
