import { Button, Flex } from "@radix-ui/themes";
import type ClassNameProps from "../shared/ClassNameProps";
import AwesomeIcon from "../shared/AwesomeIcon";

interface LoadingErrorSectionProps {
  error: Error | undefined;
  retry?: () => void;
}

export default function LoadingErrorSection({ error, retry, className }: LoadingErrorSectionProps & ClassNameProps) {
  return (
    <Flex gap="5" direction="column" justify="center" align="center" width="100%" height="100%" className={className}>
      <AwesomeIcon iconClass="wifi-slash" size="3"/>
      {retry && <Button variant="soft" onClick={retry}>Try again</Button>}
    </Flex>
  );
}
