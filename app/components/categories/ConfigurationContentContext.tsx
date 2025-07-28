import { Box, Flex } from "@radix-ui/themes";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type { Book } from "~/types/sport/types";
import AssignedBooks from "../configurations/AssignedBooks";
import ContentPreview from "../configurations/ContentPreview";
import type ClassNameProps from "../shared/ClassNameProps";

interface ConfigurationContentContextProps {
  categoryID: string;
  books?: Book[];
}

export default function ConfigurationContentContext({ categoryID, className, books }: ConfigurationContentContextProps & ClassNameProps) {
  const findCategory = useCategoryTreeStore((state) => state.findCategory);
  const assignBooks = useCategoryTreeStore((state) => state.assignBooks);
  const assignedBooks = useCategoryTreeStore((state) => state.assignedBooks);
  const category = findCategory(categoryID);
  const filterGroups = category?.filterGroups;

  return (
    <Flex
      gap="0"
      direction="column"
      flexGrow="1"
      className={className}
      style={{
        border: "1px solid var(--accent-9)",
        borderRadius: "0.5rem",
        marginTop: "0.5rem",
        overflow: "hidden",
      }}
    >
      <Box style={{ backgroundColor: "var(--accent-4)" }}>
        <AssignedBooks assignedBooks={assignedBooks} onChange={assignBooks} />
      </Box>

      <Box style={{ height: "1px", backgroundColor: "var(--accent-11)" }} />

      <Box
        style={{
          backgroundColor: "var(--accent-3)",
          flex: 1,
          overflow: "auto",
        }}
      >
        <ContentPreview filterGroups={filterGroups ? filterGroups : []} />
      </Box>
    </Flex>
  );
}
