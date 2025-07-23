import { Box, Flex } from "@radix-ui/themes";
import { useState } from "react";
import type { FilterGroup } from "~/api/sccs/types.gen";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import AssignedBooks from "../configurations/AssignedBooks";
import ContentPreview from "../configurations/ContentPreview";
import type ClassNameProps from "../shared/ClassNameProps";

interface ConfigurationContentContextProps {
  categoryID: string;
}

export default function ConfigurationContentContext({ categoryID, className }: ConfigurationContentContextProps & ClassNameProps) {
  const findCategory = useCategoryTreeStore((state) => state.findCategory);
  const books = [1, 16, 26, 27, 28];
  const [assignedBooks, setAssignedBooks] = useState<number[]>(books);
  const [originalAssignedBooks, setOriginalAssignedBooks] = useState<number[]>(books);
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
        <AssignedBooks assignedBooks={assignedBooks} originalAssignedBooks={originalAssignedBooks} onUpdate={setAssignedBooks} />
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
