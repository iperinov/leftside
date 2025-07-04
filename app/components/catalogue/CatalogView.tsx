import { Box, Flex, ScrollArea, Separator } from "@radix-ui/themes";
import { useState } from "react";
import { toast } from "sonner";
import type { RenameLeagueApiIn, RenameLeagueRegionApiIn, RenameRealSportApiIn } from "~/api/ocs/ocs.types";
import { useLeagues } from "~/hooks/useLeagues";
import { useRealSports } from "~/hooks/useRealSport";
import { useRegions } from "~/hooks/useRegions";
import type { CreateLeagueRequest } from "~/stores/createLeagueStore";
import SearchBar from "../SearchBar";
import Tree from "../tree/Tree";
import type TreeConfig from "../tree/TreeConfig";
import { type CatalogueNode, buildCatalogueTree } from "./CatalogBuilder";
import { RenameLeagueDialog } from "./RenameLeagueDialog";
import { RenameRegionDialog } from "./RenameRegionDialog";
import { RenameSportDialog } from "./RenameSportDialog";
import { WizzardRoot } from "./wizard/WizardRoot";

export default function CatalogView() {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [creating, setCreating] = useState<boolean>(false);
  const [realSport, setRealSport] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [renameSport, setRenameSport] = useState<RenameRealSportApiIn | null>(null);
  const [renameRegion, setRenameRegion] = useState<RenameLeagueRegionApiIn | null>(null);
  const [renameLeague, setRenameLeague] = useState<RenameLeagueApiIn | null>(null);

  const { isLoading: realSportsLoading, data: realSports } = useRealSports();
  const { isLoading: regionsLoading, data: regions } = useRegions();
  const { isLoading: leaguesLoading, data: leagues } = useLeagues();

  const treeConfig: TreeConfig<CatalogueNode> = {
    addToParent: {
      allowed: (level: number, _parent: CatalogueNode) => {
        return level < 3;
      },
      toString: (level: number, _parent: CatalogueNode) => {
        switch (level) {
          case 0:
            return "Create Real Sport";
          case 1:
            return "Create Region";
          case 2:
            return "Create League";
          default:
            return "";
        }
      },
      handler: (level: number, parent: CatalogueNode) => {
        switch (level) {
          case 0:
            setRealSport("");
            setRegion("");
            break;
          case 1:
            setRealSport(parent.id ?? "");
            setRegion("");
            break;
          case 2:
            setRealSport(parent.realSportUUID ?? "");
            setRegion(parent.id);
            break;
        }
        setCreating(true);
      },
    },
    expand: {
      itemIDs: expandedIds,
      handler: (item: CatalogueNode, expand: boolean) => {
        setExpandedIds((prev) => (expand ? [...prev, item.id] : prev.filter((id) => id !== item.id)));
      },
      allowed: () => true,
    },
    selection: {
      allowed: () => {
        return true;
      },
      selectedID: selectedId,
      handler: (item: CatalogueNode) => {
        setSelectedId(item.id);
      },
    },
    filter: {
      allowed: () => true,
      filter: filter,
    },
    contextMenu: {
      menuItems: [
        {
          name: "Rename",
          action: (item?: CatalogueNode) => {
            if (!item) return;

            const isSport = !item.realSportUUID && !item.regionUUID;
            const isRegion = item.realSportUUID && !item.regionUUID;
            const isLeague = item.realSportUUID && item.regionUUID;

            if (isSport) {
              console.log("Rename Sport");
              setRenameSport({ uuid: item.id, name: item.name });
            } else if (isRegion) {
              console.log("Rename Region");
              setRenameRegion({ uuid: item.id, name: item.name });
            } else if (isLeague) {
              console.log("Rename League");
              setRenameLeague({ uuid: item.id, name: item.name });
            }
          },
        },
      ],
    },
  };

  const nodes = buildCatalogueTree(realSports, regions, leagues);

  const createLeague = (req: CreateLeagueRequest) => {
    setCreating(false);
  };

  return (
    <Flex
      direction="column"
      p="3"
      flexGrow="1"
      style={{
        maxWidth: "350px",
        backgroundColor: "var(--accent-3)",
        borderTopLeftRadius: "var(--radius-3)",
        borderBottomLeftRadius: "var(--radius-3)",
        overflowY: "auto",
      }}
    >
      <SearchBar value={filter} onChange={setFilter} />
      <Separator orientation="horizontal" size="4" mb="2" />
      <Box flexGrow="1" minHeight="0">
        <ScrollArea
          size="1"
          type="auto"
          scrollbars="vertical"
          style={{
            height: "100%",
            paddingRight: "var(--space-2)",
          }}
        >
          <Tree root={nodes} level={0} {...treeConfig} />
        </ScrollArea>
        <WizzardRoot open={creating} create={createLeague} sportId={realSport} regionId={region} onClose={() => setCreating(false)} />
      </Box>

      {renameSport && (
        <RenameSportDialog
          sport={renameSport}
          onClose={() => setRenameSport(null)}
          onRename={(newName) => {
            console.log("Renamed sport to:", newName);
            toast.success("Sport renamed successfully");
            setRenameSport(null);
          }}
        />
      )}

      {renameRegion && (
        <RenameRegionDialog
          region={renameRegion}
          onClose={() => setRenameRegion(null)}
          onRename={(newName) => {
            console.log("Renamed region to:", newName);
            toast.success("Region renamed successfully");
            setRenameRegion(null);
          }}
        />
      )}

      {renameLeague && (
        <RenameLeagueDialog
          league={renameLeague}
          onClose={() => setRenameLeague(null)}
          onRename={(newName) => {
            console.log("Renamed league to:", newName);
            toast.success("League renamed successfully");
            setRenameLeague(null);
          }}
        />
      )}
    </Flex>
  );
}
