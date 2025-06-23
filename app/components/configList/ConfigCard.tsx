import type { ConfigSummary } from "~/api/configs/listConfigSummaries";
import ConfigCardContextMenu from "./ConfigCardContextMenu";

interface ConfigCardProps {
  config: ConfigSummary;
  contextItems: {
    name: string;
    action: (id?: string) => void;
  }[];
}

export default function ConfigCard({ config, contextItems }: ConfigCardProps) {
  return (
    <div className="flex items-center border border-stone-500 rounded-md hover:shadow-sm px-4 py-2 bg-white">
      <div className="flex-2 text-sm">{config.name}</div>

      <div className="flex-3 flex flex-col  text-sm">
        <label className="text-sm font-thin">Last updated</label>
        <div className="">
          {new Date(config.lmt).toDateString()} by {config.lmu}
        </div>
      </div>

      <div className="flex-3 flex flex-col text-sm">
        <label className="text-xs font-thin">Assigned to</label>
        <div className="font-normal">{config.books.join(", ")}</div>
      </div>

      <ConfigCardContextMenu context={config.id} items={contextItems} />
    </div>
  );
}