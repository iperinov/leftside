interface TreeItemInternalStateFlags {
  pending?: boolean; // optimistic update
}
export default interface TreeItemData<T extends TreeItemData<T>> extends TreeItemInternalStateFlags {
  id: string;
  name: string;
  children?: T[];
}
