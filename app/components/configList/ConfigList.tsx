import type { ConfigSummary } from "~/api/configs/listConfigSummaries";
import ConfigCard from "./ConfigCard";
import { useState } from "react";
import useConfiguration from "~/hooks/useConfigurations";
import type { MenuItem } from "../dropdownContextMenu/DropdownContextMenu";

interface ConfigListProps {
    configs: ConfigSummary[];
    contextMenuItems: MenuItem[]
}


export default function ConfigList({configs, contextMenuItems}: ConfigListProps) {
    return (
    <div className="flex flex-col gap-2 p-3">
      {configs.map((config) => {
        return (
          <ConfigCard
            key={config.id}
            config={config}
            contextItems={contextMenuItems}
          />
        );
      })}
    </div>
  );
}
