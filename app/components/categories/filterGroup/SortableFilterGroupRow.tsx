import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@radix-ui/themes";
import type { MenuItem } from "~/components/dropdownContextMenu/DropdownContextMenu";
import FiltersGroupRow from "./FilterGroupRow";
import type { FilterGroupProps } from "./FiltersGroup";

interface SortableFilterGroupRowProps extends FilterGroupProps {
  menuItems?: MenuItem<{ categoryUUID: string; filterGroupUUID: string }>[];
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
      <FiltersGroupRow attributes={attributes} listeners={listeners} {...props} />
    </Box>
  );
}
