import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export default interface SortableTriggerProps {
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}
