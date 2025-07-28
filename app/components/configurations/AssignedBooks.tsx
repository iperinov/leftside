import { CaretDownIcon } from "@radix-ui/react-icons";
import { Box, Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import { useEffect, useMemo, useRef, useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import type { BookRev } from "~/api/sccs/types.gen";
import { BaseDialog } from "~/components/shared/BaseDialog";
import { useBooks } from "~/hooks/useBooks";

interface AssignedBooksProps {
  assignedBooks: BookRev[];
  onChange: (selected: BookRev[]) => void;
}

export default function AssignedBooks({ assignedBooks, onChange }: AssignedBooksProps) {
  const { data: books = [] } = useBooks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<BookRev[]>([]);
  const originalAssignedBooks = useRef<BookRev[]>(assignedBooks);

  const columnCount = 3;
  const columnWidth = 200;

  useEffect(() => {
    if (dialogOpen) {
      setSelected(assignedBooks);
    }
  }, [dialogOpen, assignedBooks]);

  const toggleSelection = (book: BookRev) => {
    if (originalAssignedBooks.current.includes(book)) return;
    setSelected((prev) => (prev.includes(book) ? prev.filter((v) => v !== book) : [...prev, book]));
  };

  const handleConfirm = () => {
    onChange(selected);
    setDialogOpen(false);
  };

  const selectionLabel = assignedBooks.length === 0 ? "Assign to books" : `${assignedBooks.length} selection${assignedBooks.length > 1 ? "s" : ""}`;

  const hasChanges = useMemo(() => {
    const sortedA = [...selected].sort();
    const sortedB = [...assignedBooks].sort();
    return sortedA.length !== sortedB.length || sortedA.some((val, i) => val !== sortedB[i]);
  }, [selected, assignedBooks]);

  const rowCount = Math.ceil(books.length / columnCount);

  const Cell = ({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: React.CSSProperties }) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= books.length) return null;

    const book = books[index];
    const checked = selected.findIndex((b) => b.id === book.id) !== -1;
    const locked = originalAssignedBooks.current.findIndex((b) => b.id === book.id) !== -1;
    const checkboxId = `book-checkbox-${book.id}`;

    return (
      <div style={style}>
        <Flex align="center" gap="2" style={{ padding: "0.25rem 0.75rem" }}>
          <Checkbox id={checkboxId} checked={checked} onCheckedChange={() => toggleSelection(book)} disabled={locked} />
          <label htmlFor={checkboxId}>
            <Text size="2">{book.name}</Text>
          </label>
        </Flex>
      </div>
    );
  };

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
        width="auto"
        disableConfirm={!hasChanges}
      >
        <Box style={{ maxHeight: "400px", overflowY: "auto", overflowX: "hidden" }}>
          <Grid
            height={400}
            width={columnCount * columnWidth}
            columnCount={columnCount}
            columnWidth={columnWidth}
            rowCount={rowCount}
            rowHeight={48}
            style={{ overflowX: "hidden" }}
          >
            {Cell}
          </Grid>
        </Box>
      </BaseDialog>
    </>
  );
}
