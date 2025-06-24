interface TreeItemInternalStateFlags {
  expanded?: boolean;
  pending?: boolean;
}
export default interface TreeItemData extends TreeItemInternalStateFlags {
  id: string;
  name: string;
  children?: TreeItemData[];
}
