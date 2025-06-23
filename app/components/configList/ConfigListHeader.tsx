interface ConfigListHeaderProps {
    createNewConfig: () => void;
}

export default function ConfigListHeader({createNewConfig}: ConfigListHeaderProps) {
  return (
    <div className="flex justify-between items-center border-b border-stone-300">
      <div className="p-3 font-medium text-sm">Configurations</div>
      <button
        onClick={createNewConfig}
        className="border rounded-sm border-stone-500 m-2 px-10 py-2 font-bold text-xs hover:shadow-sm"
      >
        Create new configuration
      </button>
    </div>
  );
}