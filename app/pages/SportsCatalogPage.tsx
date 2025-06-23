import { useState } from "react";
import type { MenuItem } from "~/components/dropdownContextMenu/DropdownContextMenu";
import CatalogTree from "~/components/CatalogTree";
import Tree from "~/components/tree/Tree";
import useSportFilters from "~/hooks/useSportFilters";
import type TreeItemData from "~/components/tree/TreeItemData";

export default function SportsCatalogPage() {
  const { isLoading, data } = useSportFilters();
  const [ selectedID, setSelectedID ] = useState<string>("2"); 

  function findItemByIds(crumbs: string[]): TreeItemData | null {
    if (data === undefined || data.length === 0 || ids.length === 0) {    
      return null;
    }

    let levelItem: TreeItemData | null = null;
    let curLevel = data!;
    let i = 0;

    while (i < ids.length) {
      const id = ids[i];
      levelItem = curLevel.find((item) => item.id === id) || null;

      if (!levelItem || levelItem.children === undefined || levelItem.children.length === 0) {
        break;
      }

      curLevel = levelItem.children;
      i++;
    }

    return levelItem;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const onAddLevel = (parentIDs: string[]) => {
    console.log(`Add level clicked for item with id: ${parentIDs}`);

    const item = findItemByIds(parentIDs);
    if (parentItem) {

    }
  };

  const onRename = (parentIDs: string[], id: string) => {
    console.log(`Rename clicked for item with id: ${parentIDs} ${id}`);
  };

  const onDelete = (parentIDs: string[], id: string) => {
    console.log(`Delete clicked for item with id: ${parentIDs} ${id}`);
  };

  const onDuplicate = (parentIDs: string[], id: string) => {
    console.log(`Duplicate clicked for item with id: ${parentIDs} ${id}`);
  };

  const onSelected = (parentIDs: string[], id: string) => {
    console.log(`Selected item with id: ${parentIDs} ${id}`);
    setSelectedID(id);
  }

  const menuItems: MenuItem[] = [
    { name: "Rename", action: onRename },
    { name: "Delete", action: onDelete },
    { name: "Duplicate", action: onDuplicate },
  ];

  return (
    <div className="flex h-screen p-3">
      <aside className="w-[400px] bg-gray-100 border-r border-gray-200 p-4 rounded-l-lg">
        <Tree rootItems={data!} menuItems={menuItems} onAddLevel={onAddLevel} selectedID={selectedID} onSelected={onSelected}/>
      </aside>

      {/* Content Area */}
      <main className="flex-1 w-full h-full bg-gray-300 rounded-r-lg">
        {/* Placeholder for future content */}
        {/* <div className=" rounded-xl" /> */}
      </main>
    </div>
  );
}
