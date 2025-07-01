import type { FilterGroup } from "~/api/scs/configurations/config.types";
import type TreeItemData from "../tree/TreeItemData";

export default interface CategoryTreeItem
  extends TreeItemData<CategoryTreeItem> {
  type: "flat" | "nested";
  filterGroups?: FilterGroup[];
}
