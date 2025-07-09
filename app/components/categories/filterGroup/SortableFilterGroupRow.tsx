import FiltersGroupRow from "./FilterGroupRow";
import { useSortable } from "@dnd-kit/sortable";
import type { FilterGroup } from "~/api/scs/configurations/config.types";
import { CSS } from "@dnd-kit/utilities";
import { Fragment } from "react/jsx-runtime";

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
    <div ref={setNodeRef} style={style}>
      <FiltersGroupRow
        attributes={attributes}
        listeners={listeners}
        {...props}
      />
    </div>
  );
}
