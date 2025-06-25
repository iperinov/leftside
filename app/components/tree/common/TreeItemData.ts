interface TreeItemInternalStateFlags {
  expanded?: boolean;
  pending?: boolean; // optimistic update
}
export default interface TreeItemData extends TreeItemInternalStateFlags {
  id: string;
  name: string;
  children?: TreeItemData[];
}
