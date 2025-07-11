import { Box, Flex, ScrollArea, Separator } from "@radix-ui/themes";
import { useState } from "react";
import { toast } from "sonner";
import type { RenameLeagueApiIn, RenameLeagueRegionApiIn, RenameRealSportApiIn } from "~/api/ocs/ocs.types";
import { useCatalog } from "~/hooks/catalog/useCatalog";
import type { CreateLeagueRequest } from "~/stores/createLeagueStore";
import SearchBar from "../SearchBar";
import LoadDataDecorator from "../loading/LoadDataDecorator";
import Tree from "../tree/Tree";
import type TreeConfig from "../tree/TreeConfig";
import { findItemDepth, findItemParent } from "../tree/common/findItem";
import { type CatalogueNode, buildCatalogueTree } from "./CatalogBuilder";
import { RenameLeagueDialog } from "./RenameLeagueDialog";
import { RenameRegionDialog } from "./RenameRegionDialog";
import { RenameSportDialog } from "./RenameSportDialog";
import { WizzardRoot } from "./wizard/WizardRoot";

enum CatalogueNodeTypeByLevel {
  RealSport = 0,
  Region = 1,
  League = 2,
}

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
  const { data: catalog, isLoading, error } = useCatalog();

  const catalogRoot = catalog ? buildCatalogueTree(catalog) : undefined;

  const treeConfig: TreeConfig<CatalogueNode> = {
    addToParent: {
      allowed: (level: number, _parent: CatalogueNode) => {
        return level < 3;
      },
      toString: (level: number, _parent: CatalogueNode) => {
        switch (level) {
          case CatalogueNodeTypeByLevel.RealSport:
            return "Create Real Sport";
          case CatalogueNodeTypeByLevel.Region:
            return "Create Region";
          case CatalogueNodeTypeByLevel.League:
            return "Create League";
          default:
            return "";
        }
      },
      handler: (level: number, parent: CatalogueNode) => {
        if (!catalogRoot) return;

        switch (level) {
          case CatalogueNodeTypeByLevel.RealSport:
            setRealSport("");
            setRegion("");
            break;
          case CatalogueNodeTypeByLevel.Region:
            setRealSport(parent.id ?? "");
            setRegion("");
            break;
          case CatalogueNodeTypeByLevel.League:
            setRealSport(findItemParent(parent.id, catalogRoot)?.id || "");
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
      itemsFor: (item: CatalogueNode) => {
        return [
          {
            name: "Rename",
            action: (item?: CatalogueNode) => {
              if (!item || !catalogRoot) return;

              const level = findItemDepth(item.id, catalogRoot);
              switch (level) {
                case CatalogueNodeTypeByLevel.RealSport:
                  setRenameSport({ uuid: item.id, name: item.name });
                  break;
                case CatalogueNodeTypeByLevel.Region:
                  setRenameRegion({ uuid: item.id, name: item.name });
                  break;
                case CatalogueNodeTypeByLevel.League:
                  setRenameLeague({ uuid: item.id, name: item.name });
                  break;
                default:
                  throw new Error(`Unexpected level: ${level}`);
              }
            },
          },
        ];
      },
    },
  };

  const createLeague = (req: CreateLeagueRequest) => {
    setCreating(false);
  };

  return (
    <>
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
        <LoadDataDecorator error={error} isLoading={isLoading}>
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
              {catalogRoot && <Tree root={catalogRoot} level={0} {...treeConfig} />}
            </ScrollArea>
            <WizzardRoot open={creating} create={createLeague} sportId={realSport} regionId={region} onClose={() => setCreating(false)} />
          </Box>
        </LoadDataDecorator>
      </Flex>

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
    </>
  );
}
