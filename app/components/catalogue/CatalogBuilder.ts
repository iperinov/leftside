import type { League, LeagueRegion, RealSport } from "~/api/ocs/ocs.types";
import type TreeItemData from "../tree/TreeItemData";

export interface CatalogueNode extends TreeItemData<CatalogueNode> {
  realSportUUID?: string;
  regionUUID?: string;
}

export function buildCatalogueTree(realSports?: RealSport[], regions?: LeagueRegion[], leagues?: League[]): CatalogueNode {
  const regionMap = new Map<number, LeagueRegion>();
  if (regions) {
    for (const region of regions) {
      regionMap.set(region.id, region);
    }
  }

  const grouped: Map<number, Map<number, League[]>> = new Map();

  if (leagues) {
    for (const league of leagues) {
      if (!grouped.has(league.realSportId)) {
        grouped.set(league.realSportId, new Map());
      }
      const regionGroup = grouped.get(league.realSportId);
      if (!regionGroup) continue;

      if (!regionGroup.has(league.regionId)) {
        regionGroup.set(league.regionId, []);
      }
      regionGroup.get(league.regionId)?.push(league);
    }
  }

  const children: CatalogueNode[] = [];

  if (realSports) {
    for (const sport of realSports) {
      const sportGroup = grouped.get(sport.id);
      if (!sportGroup) continue;

      const regionNodes: CatalogueNode[] = [];

      for (const [regionId, leagueList] of sportGroup.entries()) {
        const region = regionMap.get(regionId);
        if (!region) continue;

        const leagueNodes: CatalogueNode[] = leagueList.map((league) => ({
          id: league.uuid,
          name: league.name,
          regionUUID: region.uuid,
          realSportUUID: sport.uuid,
        }));

        regionNodes.push({
          id: region.uuid,
          name: region.name,
          realSportUUID: sport.uuid,
          children: leagueNodes,
        });
      }

      children.push({
        id: sport.uuid,
        name: sport.name,
        children: regionNodes,
      });
    }
  }

  return {
    id: "root",
    name: "Catalog",
    children,
  };
}
