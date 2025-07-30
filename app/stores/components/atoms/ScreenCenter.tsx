import { Flex } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";

/**
 * Centers content both vertically and horizontally within most of the viewport.
 * Useful for loading indicators, empty states, etc.
 */
const ScreenCenter = ({ children }: PropsWithChildren) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    style={{
      minHeight: "calc(100vh - 10rem)", // Adjustable if header/footer size changes
    }}
  >
    {children}
  </Flex>
);

export default ScreenCenter;
