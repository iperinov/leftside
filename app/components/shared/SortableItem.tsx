import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@radix-ui/themes";
import type React from "react";

interface SortableItemProps {
  id: UniqueIdentifier;
  dragStyle?: React.CSSProperties;
  children: React.ReactNode;
}

export default function SortableItem({ id, dragStyle, children }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging && dragStyle),
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Box>
  );
}
