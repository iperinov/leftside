import useSportFilters from "~/hooks/useSportFilters";
import Tree from "./tree/Tree";
import type { MenuItem } from "./dropdownContextMenu/DropdownContextMenu";
import CatalogItem from "./CatalogItem";


export default function Catalog() {
  const {isLoading, data} = useSportFilters();

  if (isLoading || !data) {
    return <div>Loading...</div>;
  } 

  return (
    <>
      <CatalogItem data={data[0]} />
    </>
  );
}
