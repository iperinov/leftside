
import type { FilterGroup } from "~/api/sccs/types.gen";
import type TreeItemData from "../../tree/TreeItemData";

interface InternalFlags {
  focusAttention?: boolean;
  type: "flat" | "nested";
}

interface Metadata {
  sportID?: string;
  iconID?: string;
}

export default interface CategoryTreeItem extends TreeItemData<CategoryTreeItem>, Metadata, InternalFlags {
  filterGroups?: FilterGroup[];
}
