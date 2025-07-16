import { Box, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { GroupBy, Order } from "~/api/scs/configurations/config.consts";
import type { FilterGroup } from "~/api/scs/configurations/config.types";
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
    uuid: "1235560F-5325-48A4-A0A2-632419148D34",
    filters: [
      {
        //ECUADOR - LIGA SERIE A
        type: "league",
        values: ["6615560F-5325-48A4-A0A2-632419148D34"],
      },
    ],
    groupBy: GroupBy.LeagueDay,
    order: Order.Desc,
    //limit: 1,
  },
  {
    uuid: "4565560F-5325-48A4-A0A2-632419148D34",
    filters: [
      {
        // NFL
        type: "league",
        values: ["F47370AC-44C3-4CC6-8358-8798C1E0DA9A"],
      },
    ],
    groupBy: GroupBy.SportLeague,
    order: Order.Asc,
    //limit: 1,
  },
];

export default function ConfigurationContentContext({ categoryID, className }: ConfigurationContentContextProps & ClassNameProps) {
  const category = useCategoryTreeStore((state) => state.findCategory(categoryID));

  const categorySelected = categoryID !== "";

  const filterGroups = category?.filterGroups;
  console.log("ConfigurationContentContext filterGroups", filterGroups);
  const books = [1, 16, 26, 27, 28];
  const [assignedBooks, setAssignedBooks] = useState<number[]>(books);
  const [originalAssignedBooks, setOriginalAssignedBooks] = useState<number[]>(books);

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
