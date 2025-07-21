import { Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import DropdownContextMenu from "~/components/dropdownContextMenu/DropdownContextMenu";
import type { MenuItem } from "~/components/dropdownContextMenu/DropdownContextMenu";
import { useBooks } from "~/hooks/useBooks";
import { formatDateTime } from "~/utils/date";
import { useConfigurations } from "../../hooks/useConfigurations";
import styles from "./ConfigurationList.module.css";
import type { Configuration } from "~/api/cdb/cdb.types";
import LoadDataDecorator from "../loading/LoadDataDecorator";

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
      return booksData ? ids.map((bid) => booksData.find((b) => b.id === bid)?.name).filter(Boolean) as string[] : [];
    };
  }, [booksData]);

  return (
    <LoadDataDecorator isLoading={isLoadingConfigs || isLoadingBooks} error={errorConfigs || errorBooks}>
      <Box className={styles.inner}>
        <Flex direction="column" gap="1">
          {configurations?.map((config: Configuration) => {
            const menuItems: MenuItem<Configuration>[] = [
              {
                name: "Edit",
                action: () => onEdit(config.uuid, config.name),
              },
              {
                name: "Rename",
                action: () => onRename(config.uuid, config._rev, config.name),
              },
              {
                name: "Duplicate",
                action: () => onDuplicate(config.uuid, config._rev, config.name),
              },
            ];

            if (config.books.length === 0) {
              menuItems.push({
                name: "Delete",
                action: () => onDelete(config.uuid, config._rev, config.name),
              });
            }

            return (
              <Card key={config.uuid} variant="classic" style={{ borderRadius: 6 }}>
                <Flex direction="row" justify="between" align="center" p="2">
                  <Flex direction="row" justify="between" style={{ width: "100%" }}>
                    <Box style={{ flexBasis: "33%", paddingRight: "1rem" }}>
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

                  <DropdownContextMenu items={menuItems} context={config} />
                </Flex>
              </Card>
            );
          })}
        </Flex>
      </Box>
    </LoadDataDecorator>
  );
};
