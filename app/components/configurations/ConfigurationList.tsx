import * as Popover from "@radix-ui/react-popover";
import { Box, Button, Card, Flex, Separator, Text } from "@radix-ui/themes";
import React from "react";
import { useBooks } from "~/hooks/useBooks";
import { formatDateTime } from "~/utils/date";
import type { Configuration } from "../../api/scs/configurations/config.types";
import { useConfigurations } from "../../hooks/useConfigurations";
import LoadingIndicator from "../shared/LoadingIndicator";
import styles from "./ConfigurationList.module.css";

export interface ConfigurationListProps {
  onEdit: (id: string, name: string) => void;
  onRename: (id: string, rev: string, name: string) => void;
  onDuplicate: (id: string, rev: string, name: string) => void;
  onDelete: (id: string, rev: string, name: string) => void;
}

export const ConfigurationList = ({
  onEdit,
  onRename,
  onDuplicate,
  onDelete,
}: ConfigurationListProps) => {
  const { data: booksData = [] } = useBooks();
  const { data = [], isLoading, error } = useConfigurations();

  // On every render this gets recalculated, so it’s a costly operation per render.
  // Using useMemo is the best option as it would only recalculate the function if the inputs change.
  const resolveBookNames = React.useMemo(() => {
    return (ids: number[]): string[] => {
      return ids
        .map((bid) => booksData.find((b) => b.id === bid)?.name)
        .filter(Boolean) as string[];
    };
  }, [booksData]);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <Text color="red">Error loading configurations</Text>;

  return (
    <Box className={styles.inner}>
      <Flex direction="column" gap="1">
        {data.map((config: Configuration) => (
          <Card key={config.uuid} variant="classic" style={{ borderRadius: 6 }}>
            <Flex direction="row" justify="between" align="center" p="2">
              <Flex direction="row" justify="between" style={{ width: "100%" }}>
                <Box style={{ flexBasis: "33%", paddingRight: "1rem" }}>
                  <Text weight="bold" size="2" color="gray" mb="1">
                    {config.name}
                  </Text>
                </Box>
                <Box style={{ flexBasis: "33%", paddingRight: "1rem" }}>
                  <Text size="1" color="gray">
                    Last updated
                  </Text>
                  <br />
                  <Text size="1" color="gray" weight="bold">
                    {formatDateTime(config.lmt, undefined, undefined)} by{" "}
                    {config.lmu}
                  </Text>
                </Box>
                <Box style={{ flexBasis: "33%", paddingRight: "1rem" }}>
                  <Text size="1" color="gray">
                    Assigned to
                  </Text>
                  <br />
                  <Text size="1" color="gray" weight="bold">
                    {resolveBookNames(config.books).join(", ")}
                  </Text>
                </Box>
              </Flex>

              <Popover.Root>
                <Popover.Trigger asChild>
                  <Button
                    type="button"
                    aria-label="Actions"
                    variant="ghost"
                    className={styles.popoverTrigger}
                  >
                    ⋯
                  </Button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    side="bottom"
                    align="end"
                    className={styles.popoverContent}
                  >
                    <Button
                      onClick={() => onEdit(config.uuid, config.name)}
                      className={styles.actionButton}
                    >
                      Edit
                    </Button>
                    <Separator my="1" size="1" />
                    <Button
                      onClick={() =>
                        onRename(config.uuid, config.rev, config.name)
                      }
                      className={styles.actionButton}
                    >
                      Rename
                    </Button>
                    <Separator my="1" size="1" />
                    <Button
                      onClick={() =>
                        onDuplicate(config.uuid, config.rev, config.name)
                      }
                      className={styles.actionButton}
                    >
                      Duplicate
                    </Button>
                    {config.books.length === 0 && (
                      <>
                        <Separator my="1" size="1" />
                        <Button
                          onClick={() =>
                            onDelete(config.uuid, config.rev, config.name)
                          }
                          className={styles.actionButton}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};
