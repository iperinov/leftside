export default interface ItemData<T extends string | number> {
  id: T;
  name: string;
}

export const allStringItemData = { id: "all", name: "All" } as ItemData<string>;
export const allNumberItemData = { id: 0, name: "All" } as ItemData<number>;
