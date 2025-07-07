import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/lib/queryKeys";
import { useRealSports } from "../useRealSport";
import { useLeagues } from "../useLeagues";
import { useRegions } from "../useRegions";
import getCatalogItems from "~/api/cdb/getCatalogItems";
import type { CatalogItem } from "~/api/cdb/cdb.types";
import type { RealSport, LeagueRegion as Region, League } from "~/api/ocs/ocs.types";

export interface CatalogItemBase {
  id: number;
  uuid: string;
  name: string;
}

export interface LeagueCatalogItem extends CatalogItemBase {}

export interface RegionCatalogItem extends CatalogItemBase {
  leagues: LeagueCatalogItem[];
}

export interface SportCatalogItem extends CatalogItemBase {
  regions: RegionCatalogItem[];
}

export interface Catalog {
  sports: SportCatalogItem[];
}

function buildCatalogItemBaseFrom<T extends CatalogItemBase>(item: T): CatalogItemBase {
  return { id: item.id, uuid: item.uuid, name: item.name };
}   

function buildCatalog(catalogItems: CatalogItem[], sports: RealSport[], regions: Region[], leagues: League[]): Catalog {
  const catalog: Catalog = { sports: [] };
  catalogItems.forEach((item) => {
    const sport = sports.find((s) => s.id === item.realSportID); // TODO use uuid instead of id
    const region = regions.find((r) => r.id === item.regionID); // TODO use uuid instead of id
    const league = leagues.find((l) => l.id === item.leagueID); // TODO use uuid instead of id
    if (!sport || !region || !league) return;

    let sportCatalogItem = catalog.sports.find((s) => s.uuid === sport.uuid);
    if (!sportCatalogItem) {
      catalog.sports.push({
        ...buildCatalogItemBaseFrom(sport) as SportCatalogItem,
        regions: [{
            ...buildCatalogItemBaseFrom(region) as RegionCatalogItem,
            leagues: [ buildCatalogItemBaseFrom(league) as LeagueCatalogItem ],
          },
        ],
      });
      return;
    } 

    let regionCatalogItem = sportCatalogItem.regions.find((r) => r.uuid === region.uuid);
    if (!regionCatalogItem) {
      sportCatalogItem.regions.push({
        ...buildCatalogItemBaseFrom(region) as RegionCatalogItem,
        leagues: [ buildCatalogItemBaseFrom(league) as LeagueCatalogItem ],
      });
      return;
    }   

    let leagueCatalogItem = regionCatalogItem.leagues.find((l) => l.uuid === league.uuid);
    if (!leagueCatalogItem) {
      regionCatalogItem.leagues.push(buildCatalogItemBaseFrom(league) as LeagueCatalogItem);
      return;
    }

    throw new Error(`Duplicate catalog item found: ${league.name} in region ${region.name} for sport ${sport.name}`);
  });
  console.log("Catalog built successfully:", { catalog, catalogItems, sports, regions, leagues });

  return catalog;
}

export const useCatalog = () => {
  const { data: realSports, isLoading: isLoadingRealSports, error: errorSports } = useRealSports();
  const { data: realLeagues, isLoading: isLoadingRealLeagues, error: errorLeagues } = useLeagues();
  const { data: regions, isLoading: isLoadingRegions, error: errorRegions } = useRegions();

  const isLoading = isLoadingRealSports || isLoadingRealLeagues || isLoadingRegions;
  const error = errorSports || errorLeagues || errorRegions;

  const query = useQuery({
    queryKey: queryKeys.catalogItems(),
    queryFn: async () => {
      const catalogItems = await getCatalogItems();
      return buildCatalog(catalogItems, realSports!, regions!, realLeagues!);
    },
    enabled: !isLoading && !error && realSports !== undefined && realLeagues !== undefined && regions !== undefined,
  });

  return {
    data: query.data,
    isLoading: isLoading || query.isLoading,
    error: error || query.error,
  };
};