import { Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import type { Configuration } from "~/api/cdb/cdb.types";
import DropdownContextMenu from "~/components/dropdownContextMenu/DropdownContextMenu";
import type { MenuItem } from "~/components/dropdownContextMenu/DropdownContextMenu";
import { useBooks } from "~/hooks/useBooks";
import { formatDateTime } from "~/utils/date";
import { useConfigurations } from "../../hooks/configuraitons/useConfigurations";
import LoadDataDecorator from "../loading/LoadDataDecorator";
import styles from "./ConfigurationList.module.css";

export interface ConfigurationListProps {
  onEdit: (id: string, name: string) => void;
  onRename: (id: string, rev: string, name: string) => void;
  onDuplicate: (id: string, rev: string, name: string) => void;
  onDelete: (id: string, rev: string, name: string) => void;
}

export const ConfigurationList = ({ onEdit, onRename, onDuplicate, onDelete }: ConfigurationListProps) => {
  const { data: booksData, isLoading: isLoadingBooks, error: errorBooks } = useBooks();
  const { data: configurations, isLoading: isLoadingConfigs, error: errorConfigs } = useConfigurations();

  const resolveBookNames = React.useMemo(() => {
    return (ids: number[]): string[] => {
      return booksData ? (ids.map((bid) => booksData.find((b) => b.id === bid)?.name).filter(Boolean) as string[]) : [];
    };
  }, [booksData]);

  const menuItemsWithoutDelete: MenuItem<Configuration>[] = [
    { name: "Edit", action: (context) => context && onEdit(context.uuid, context.name) },
    { name: "Rename", action: (context) => context && onRename(context.uuid, context._rev, context.name) },
    { name: "Duplicate", action: (context) => context && onDuplicate(context.uuid, context._rev, context.name) },
  ];

  const menuItems: MenuItem<Configuration>[] = [
    ...menuItemsWithoutDelete,
    { name: "Delete", action: (context) => context && onDelete(context.uuid, context._rev, context.name) },
  ];

  return (
    <LoadDataDecorator isLoading={isLoadingConfigs || isLoadingBooks} error={errorConfigs || errorBooks}>
      <Box className={styles.inner}>
        <Flex direction="column" gap="1">
          {configurations?.map((config: Configuration) => {
            return (
              <Card key={config.uuid} variant="classic" style={{ borderRadius: 6 }}>
                <Flex direction="row" justify="between" align="center" p="2">
                  <Flex direction="row" justify="between" style={{ width: "100%" }}>
                    <Box style={{ flexBasis: "33%", paddingRight: "1rem", alignContent: "center" }}>
                      <Text weight="bold" size="2" mb="1" style={{ color: "var(--accent-11)" }}>
                        {config.name}
                      </Text>
                    </Box>
                    <Box style={{ flexBasis: "33%", paddingRight: "1rem" }}>
                      <Text size="1" style={{ color: "var(--accent-11)" }}>
                        Last updated
                      </Text>
                      <br />
                      <Text size="1" weight="bold" style={{ color: "var(--accent-11)" }}>
                        {formatDateTime(config.lmt, undefined, undefined)} by {config.lmu}
                      </Text>
                    </Box>
                    <Box style={{ flexBasis: "33%", paddingRight: "1rem" }}>
                      <Text size="1" style={{ color: "var(--accent-11)" }}>
                        Assigned to
                      </Text>
                      <br />
                      <Text size="1" weight="bold" style={{ color: "var(--accent-11)" }}>
                        {resolveBookNames(config.books).join(", ")}
                      </Text>
                    </Box>
                  </Flex>

                  <DropdownContextMenu items={config.books.length === 0 ? menuItems : menuItemsWithoutDelete} context={config} />
                </Flex>
              </Card>
            );
          })}
        </Flex>
      </Box>
    </LoadDataDecorator>
  );
};
