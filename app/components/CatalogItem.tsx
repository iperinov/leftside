import { CaretRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { useCatalogStore } from "~/stores/catalogStore";

export interface CatalogItemData {
  id: string;
  name: string;
  children?: CatalogItemData[];
}

interface CatalogItemProps {
  data: CatalogItemData;
  depth?: number;
}
export default function CatalogItem({ data, depth = 0 }: CatalogItemProps) {
  const { isExpanded, toggleExpanded } = useCatalogStore();
  const expanded = isExpanded(data.id);
  const hasChildren = data.children && data.children.length > 0;

  return (
    <>
      <div
        className={clsx(
          "flex items-center justify-between bg-white rounded px-2 py-1 my-1 shadow-sm hover:bg-gray-100 select-none",
          {
            "ml-1": depth > 0,
          },
        )}
        onClick={() => toggleExpanded(data.id)}
      >
        <div className="flex items-center space-x-2">
          {/*Icon Button*/}
          {hasChildren && (
            <CaretRightIcon
              className={clsx("transition-transform", {
                "rotate-90": expanded,
              })}
            />
          )}

          {/* Name text */}
          <span className="text-sm font-light text-gray-800 leading-normal">
            {data.name}
          </span>
        </div>
      </div>

      {/* Children items */}
      {expanded && hasChildren && (
        <div className="ml-4">
          {data.children?.map((child) => (
            <CatalogItem key={child.id} data={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </>
  );
}
