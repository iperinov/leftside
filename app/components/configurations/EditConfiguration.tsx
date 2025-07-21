import { Cross2Icon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import AssignedBooks from "./AssignedBooks";
import ContentPreview from "./ContentPreview";
import type { FilterGroup } from "~/api/sccs/types.gen";
import { GroupBy, Order } from "~/api/sccs/configurations/config.consts";

interface EditConfigurationProps {
  uuid: string;
  name: string;
  onClose: () => void;
}

const mockFilterGroups: FilterGroup[] = [
  {
    uuid: "A1B2C3D4-E5F6-7890-ABCD-EF1234567890",
    filters: [
      {
        // USA - MLS
        type: "league",
        value: ["8ADE19BD-BC0C-489C-9568-87913DE486C7"],
      },
    ],
    groupBy: GroupBy.SportDay,
    order: Order.Asc,
    limit: 1,
  },
  {
    uuid: "4565560F-5325-48A4-A0A2-632419148D34",
    filters: [
      {
        //NFL
        type: "league",
        value: ["F47370AC-44C3-4CC6-8358-8798C1E0DA9A"],
      },
    ],
    groupBy: GroupBy.DayLeague,
    order: Order.Desc,
    limit: 1,
  },
];

export function EditConfiguration({ uuid, name, onClose }: EditConfigurationProps) {
  const books = [1, 16, 26, 27, 28];
  const [configName, setValue] = useState(name);
  const [assignedBooks, setAssignedBooks] = useState<number[]>(books);
  const [originalAssignedBooks, setoriginalAssignedBooks] = useState<number[]>(books);

  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "var(--accent-3)",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Flex justify="between" align="center" style={{ backgroundColor: "var(--accent-9)", padding: "1rem 1.5rem" }}>
        <Text size="3" weight="bold" style={{ color: "white" }}>
          Edit:{" "}
          <Text as="span" weight="medium">
            {configName}
          </Text>
        </Text>
        <Button variant="ghost" style={{ color: "white" }} onClick={onClose}>
          <Cross2Icon />
        </Button>
      </Flex>

      {/* Body */}
      <Flex direction="row" style={{ flexGrow: 1, padding: "1rem" }}>
        <Box
          style={{
            flex: 1,
            border: "1px solid var(--accent-6)",
            marginRight: "0.5rem",
          }}
        >
          {/* Left Column - Hierarchy UI */}
        </Box>
        <Box
          style={{
            flex: 2,
            border: "1px solid var(--accent-6)",
            marginRight: "0.5rem",
          }}
        >
          {/* Center Column - Filters/Chips UI */}
        </Box>
        <Box
          style={{
            flex: 1,
            border: "1px solid var(--accent-6)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden", // TODO scrolling
          }}
        >
          <AssignedBooks assignedBooks={assignedBooks} originalAssignedBooks={originalAssignedBooks} onUpdate={setAssignedBooks} />
          <ContentPreview filterGroups={mockFilterGroups} />
        </Box>
      </Flex>

      {/* Footer */}
      <Flex
        justify="end"
        gap="4"
        style={{
          backgroundColor: "var(--accent-9)",
          padding: "1rem",
          borderTop: "1px solid var(--accent-5)",
        }}
      >
        <Button
          variant="ghost"
          style={{ color: "white" }}
          // disabled={isProcessing}
          className="buttonGhost"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="ghost"
          style={{ color: "white" }}
          // onClick={onConfirm}
          className="buttonGhost"
          disabled={!configName.trim()}
        >
          Save changes
        </Button>
      </Flex>
    </Box>
  );
}
