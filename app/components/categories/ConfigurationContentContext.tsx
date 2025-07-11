import { Box, Flex } from "@radix-ui/themes";
import { useState } from "react";
import type { FilterGroup } from "~/api/ssm/ssm.types";
import { GroupBy, Order } from "~/api/ssm/ssm.types";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import AssignedBooks from "../configurations/AssignedBooks";
import ContentPreview from "../configurations/ContentPreview";
import type ClassNameProps from "../shared/ClassNameProps";

interface ConfigurationContentContextProps {
  categoryID: string;
}

// TODO replace with API call
const mockFilterGroups: FilterGroup[] = [
  {
    filters: [
      {
        // USA - MLS
        type: "league",
        value: ["8ADE19BD-BC0C-489C-9568-87913DE486C7"],
      },
    ],
    groupBy: GroupBy.SportDate,
    order: Order.Asc,
    //limit: 1,
  },
  {
    filters: [
      {
        //NFL
        type: "league",
        value: ["F47370AC-44C3-4CC6-8358-8798C1E0DA9A"],
      },
    ],
    groupBy: GroupBy.Date,
    order: Order.Desc,
    //limit: 1,
  },
];

export default function ConfigurationContentContext({ categoryID, className }: ConfigurationContentContextProps & ClassNameProps) {
  const category = useCategoryTreeStore((state) => state.findCategory(categoryID));

  const categorySelected = categoryID !== "";

  const books = [1, 16, 26, 27, 28];
  const [assignedBooks, setAssignedBooks] = useState<number[]>(books);
  const [originalAssignedBooks, setoriginalAssignedBooks] = useState<number[]>(books);

  return (
    <Flex
      gap="0"
      direction="column"
      flexGrow="1"
      style={{
        border: "1px solid var(--accent-9)",
        borderRadius: "0.5rem",
        marginTop: "0.5rem",
        overflow: "hidden",
      }}
      className={className}
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
        <ContentPreview filterGroups={categorySelected ? mockFilterGroups : []} />
      </Box>
    </Flex>
  );
}
