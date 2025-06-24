export default interface TreeStruct<T> {
    id: string;
    children?: TreeStruct<T>[];
}