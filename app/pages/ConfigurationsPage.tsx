import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import { useState, type ReactNode } from "react";
import type { MenuItem } from "~/components/dropdownContextMenu/DropdownContextMenu";
import useSportFilters from "~/hooks/useSportFilters";
import type TreeItemData from "~/components/tree/TreeItemData";
import Tree from "~/components/tree/Tree";

let index = 0;

export default function ConfigurationsPage() {
  const { isLoading, data, error } = useSportFilters();
  const [selectedID, setSelectedID] = useState<string>("2");

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const getTrailTreeItems = (crumbs: string[]) => {
    let trail: TreeItemData[] = [];

    if (crumbs.length === 0 || !data || data.length === 0) {
      return trail;
    }

    let item: TreeItemData | undefined = data.find((i) => i.id === crumbs[0]);
    let i = 0;

    while (item && i < crumbs.length) {
      trail.push(item);
      i++;
      item = item.children?.find((child) => child.id === crumbs[i]);
    }
    return trail;
  };

 const onAddLevel = (crumbs: string[]) => {
    console.log(`Add level clicked for item with id: ${crumbs}`);

    const trail = getTrailTreeItems(crumbs);
    console.log(trail);

    const parent = trail.at(-1);
    if (!parent) {
      console.error("No parent found for the given crumbs");
      return;
    }

    const newItem: TreeItemData = {
      id: `${parent.id}-${index++}`,
      name: `${parent.name} ${index}`,
      children: [],
    };

    if (!parent.children) {
      parent.children = [];
    }

    parent.children.push(newItem);
  };

  const onRename = (crumbs: string[]) => {
    console.log(`Rename clicked for item with id: ${crumbs}`);
  };

  const onDelete = (crumbs: string[]) => {
    console.log(`Delete clicked for item with id: ${crumbs}`);
  };

  const onDuplicate = (crumbs: string[]) => {
    console.log(`Duplicate clicked for item with id: ${crumbs}`);
  };

  const onSelected = (crumbs: string[]) => {
    console.log(`Selected item with id: ${crumbs}`);
    setSelectedID(crumbs[crumbs.length - 1]);
  };

  const menuItems: MenuItem[] = [
    { name: "Rename", action: onRename },
    { name: "Delete", action: onDelete },
    { name: "Duplicate", action: onDuplicate },
  ];

  return (
    <div className="flex h-screen p-3">
      <aside className="w-[400px] bg-gray-100 border-r border-gray-200 p-4 rounded-l-lg">
        <LoadDataDecorator error={error} isLoading={isLoading}>
          <Tree rootItems={data!} menuItems={menuItems} onAddLevel={onAddLevel} selectedID={selectedID} onSelected={onSelected} />
        </LoadDataDecorator>
      </aside>

      {/* Content Area */}
      <main className="flex-1 w-full h-full bg-gray-300 rounded-r-lg">
        {/* Placeholder for future content */}
        {/* <div className=" rounded-xl" /> */}
      </main>
    </div>
  );
}
