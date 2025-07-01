import { CaretDownIcon } from "@radix-ui/react-icons";
import { Box, Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import { BaseDialog } from "~/components/shared/BaseDialog";
import { useBooks } from "~/hooks/useBooks";

interface AssignedBooksProps {
  assignedBooks: number[];
  onUpdate: (selected: number[]) => void;
}

export default function AssignedBooks({
  assignedBooks,
  onUpdate,
}: AssignedBooksProps) {
  const { data: books = [] } = useBooks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<number[]>(assignedBooks);

  // Prevent unchecking originally assigned books
  const toggleSelection = (id: number) => {
    if (assignedBooks.includes(id)) return;
    setTempSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const handleConfirm = () => {
    onUpdate(tempSelected);
    setDialogOpen(false);
  };

  const selectionLabel =
    assignedBooks.length === 0
      ? "Assign to books"
      : `${assignedBooks.length} selection${assignedBooks.length > 1 ? "s" : ""}`;

  return (
    <>
      <Flex align="center" gap="3" mb="3" mt="2" mr="2" ml="3">
        <Text size="2" weight="medium" style={{ whiteSpace: "nowrap" }}>
          Assigned to
        </Text>
        <Button
          variant="soft"
          onClick={() => setDialogOpen(true)}
          style={{
            justifyContent: "space-between",
            flex: 1,
            paddingLeft: "1rem",
            maxWidth: "300px",
          }}
        >
          <Text size="2" color="gray">
            {selectionLabel}
          </Text>
          <CaretDownIcon />
        </Button>
      </Flex>

      <BaseDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
        title="Assigned books"
        confirmLabel="Select"
      >
        <Box
          style={{
            maxHeight: "240px",
            overflowY: "auto",
            padding: "0.5rem 0",
          }}
        >
          <Flex wrap="wrap" gap="4">
            {books.map((book) => {
              const checked = tempSelected.includes(book.id);
              const locked = assignedBooks.includes(book.id);

              return (
                <Flex
                  key={book.id}
                  align="center"
                  gap="2"
                  style={{ width: "45%" }}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggleSelection(book.id)}
                    disabled={locked}
                  />
                  <Text size="2">{book.name}</Text>
                </Flex>
              );
            })}
          </Flex>
        </Box>
      </BaseDialog>
    </>
  );
}
