import FiltersGroupRow from "./FilterGroupRow";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@radix-ui/themes";

interface SortableFilterGroupRowProps {
  categoryUUID: string;
  filterGroupUUID: string;
  onDuplicate?: (categoryUUID: string, filterGroupUUID: string) => void;
  onDelete?: (categoryUUID: string, filterGroupUUID: string) => void;
}

export default function SortableFilterGroupRow(props: SortableFilterGroupRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.filterGroupUUID });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Box ref={setNodeRef} style={style}>
      <FiltersGroupRow
        attributes={attributes}
        listeners={listeners}
        {...props}
      />
    </Box>
  );
}
