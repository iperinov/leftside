import type TreeItemData from "../TreeItemData";

export default function makeRoot(children: TreeItemData[] = []): TreeItemData {
    return {
        id: "root-item-id",
        name: "",
        children: children
    };
}