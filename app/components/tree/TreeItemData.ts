export default interface TreeItemData {
  id: string;
  name: string;
  expanded?: boolean;
  children?: TreeItemData[];
}
