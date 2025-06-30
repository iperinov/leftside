export default interface ItemData<T extends string | number> {
  id: T;
  name: string;
}

export const allItemData = { id: "all", name: "All" } as ItemData<string>;
