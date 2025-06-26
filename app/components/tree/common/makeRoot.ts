import type TreeItemData from "../TreeItemData";

export default function makeRoot<T extends TreeItemData<T>>(children: T[] = []): T {
    return {
        id: "root-item-id",
        name: "",
        children: children
    } as T;
}