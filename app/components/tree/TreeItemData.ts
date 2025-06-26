import type ItemData from "~/common/ItemData";

interface TreeItemInternalStateFlags {
  expanded?: boolean;
  pending?: boolean; // optimistic update
}
export default interface TreeItemData<T extends TreeItemData<T>> extends ItemData, TreeItemInternalStateFlags {
  id: string;
  name: string;
  children?: T[];
}
