import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import { useState, type ReactNode } from "react";
import type { MenuItem } from "~/components/dropdownContextMenu/DropdownContextMenu";
import useSportFilters, { useAddFilter } from "~/hooks/useSportFilters";
import type TreeItemData from "~/components/tree/TreeItemData";
import Tree from "~/components/tree/Tree";

let index = 0;

export default function ConfigurationsPage() {
  const { isLoading, data: sportFilters, error } = useSportFilters();
  const { mutate: addFilter, isPending } = useAddFilter();
  const [selectedID, setSelectedID] = useState<string>("2");

  if (isLoading || !sportFilters) {
    return <div>Loading...</div>;
  }

  const onAddLevel = (parentID?: string) => {
    console.log(`Add level clicked for item with id: ${parentID}`);

    const newFilter: TreeItemData = {
      id: `new-${index++}`,
      name: `New Filter ${index}`,
    };

    addFilter({ newFilter, parentID });
  };

  const onRename = (context?: string) => {
    console.log(`Rename clicked for item with id: ${context}`);
  };

  const onDelete = (context?: string) => {
    console.log(`Delete clicked for item with id: ${context}`);
  };

  const onDuplicate = (context?: string) => {
    console.log(`Duplicate clicked for item with id: ${context}`);
  };

  const onSelected = (id?: string) => {
    console.log(`Selected item with id: ${id}`);
    setSelectedID(id || "");
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
          <Tree rootItems={sportFilters} menuItems={menuItems} onAddLevel={onAddLevel} selectedID={selectedID} onSelected={onSelected} mutationInProgress={isPending} />
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
