import { CaretDownIcon } from "@radix-ui/react-icons";
import { Box, Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import { useMemo, useState } from "react";
import { BaseDialog } from "~/components/shared/BaseDialog";
import { useBooks } from "~/hooks/useBooks";

interface AssignedBooksProps {
  assignedBooks: number[];
  originalAssignedBooks: number[];
  onUpdate: (selected: number[]) => void;
}

export default function AssignedBooks({
  assignedBooks,
  originalAssignedBooks,
  onUpdate,
}: AssignedBooksProps) {
  const { data: books = [] } = useBooks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<number[]>(assignedBooks);

  // Prevent unchecking originally assigned books.
  const toggleSelection = (id: number) => {
    if (originalAssignedBooks.includes(id)) return;
    setTempSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  // Handle confirm operation.
  const handleConfirm = () => {
    onUpdate(tempSelected);
    setDialogOpen(false);
  };

  const selectionLabel =
    assignedBooks.length === 0
      ? "Assign to books"
      : `${assignedBooks.length} selection${assignedBooks.length > 1 ? "s" : ""}`;

  // Detect on changed.
  const hasChanges = useMemo(() => {
    const sortedA = [...tempSelected].sort();
    const sortedB = [...assignedBooks].sort();
    return (
      sortedA.length !== sortedB.length ||
      sortedA.some((val, i) => val !== sortedB[i])
    );
  }, [tempSelected, assignedBooks]);

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
          <Text size="2" style={{ color: "var(--accent-11)" }}>
            {selectionLabel}
          </Text>
          <CaretDownIcon />
        </Button>
      </Flex>

      <BaseDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
        title="Assigned to books"
        confirmLabel="Select"
        width="600px"
        disableConfirm={!hasChanges}
      >
        <Box
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            padding: "0.5rem 0",
          }}
        >
          <Flex wrap="wrap" gap="4">
            {books.map((book) => {
              const checked = tempSelected.includes(book.id);
              const locked = originalAssignedBooks.includes(book.id);
              //Use id and htmlFor to explicitly link the label and the Checkbox
              const checkboxId = `book-checkbox-${book.id}`;

              return (
                <Flex
                  key={book.id}
                  align="center"
                  gap="2"
                  style={{ width: "30%" }} // 3 columns per row
                >
                  <Checkbox
                    id={checkboxId}
                    checked={checked}
                    onCheckedChange={() => toggleSelection(book.id)}
                    disabled={locked}
                  />
                  <label
                    htmlFor={checkboxId}
                    style={{ cursor: locked ? "default" : "pointer" }}
                  >
                    <Text size="2">{book.name}</Text>
                  </label>
                </Flex>
              );
            })}
          </Flex>
        </Box>
      </BaseDialog>
    </>
  );
}
