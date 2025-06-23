import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-2 border-b border-gray-300 rounded">
      <MagnifyingGlassIcon />
      <input
        type="text"
        placeholder="Search"
        className="outline-none bg-transparent text-sm text-gray-700"
      />
    </div>
  );
}
