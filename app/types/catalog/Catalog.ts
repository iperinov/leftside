import type { CatalogItem } from "~/api/cdb/cdb.types";
import { isAllArray, isAllFilter } from "~/components/categories/AllItemData";
import type { BasicEntity, League, RealSport, LeagueRegion as Region } from "~/types/sport/types";

export interface LeagueCatalogItem extends BasicEntity {}

export interface RegionCatalogItem extends BasicEntity {
  leagues: LeagueCatalogItem[];
}

export interface SportCatalogItem extends BasicEntity {
  regions: RegionCatalogItem[];
}

export interface CatalogActions {
  allSports(): SportCatalogItem[];
  allRegions(): RegionCatalogItem[];
  allUniqueRegions(): RegionCatalogItem[];
  allLeagues(): LeagueCatalogItem[];

  findSport(uuid: string): SportCatalogItem | undefined;
  findRegion(uuid: string): RegionCatalogItem | undefined;
  findLeague(uuid: string): LeagueCatalogItem | undefined;

  filteredLeaguesBy(sports: string[]): LeagueCatalogItem[];
  filteredSportsBy(leagues: string[]): SportCatalogItem[];
  //filteredRegionsBy(leagueUUIDs: string[]): BasicEntity[];
}

export class Catalog implements CatalogActions {
  sports: SportCatalogItem[];

  constructor(catalogItems: CatalogItem[], realSports: RealSport[], regions: Region[], leagues: League[]) {
    this.sports = [];
    for (const item of catalogItems) {
      const sport = realSports.find((s) => s.uuid === item.realSportUUID);
      const region = regions.find((r) => r.uuid === item.regionUUID);
      const league = leagues.find((l) => l.uuid === item.leagueUUID);
      if (!sport || !region || !league) continue;

      const sportCatalogItem = this.sports.find((s) => s.uuid === sport.uuid);
      if (!sportCatalogItem) {
        this.sports.push({
          ...(buildCatalogItemBaseFrom(sport) as SportCatalogItem),
          regions: [
            {
              ...(buildCatalogItemBaseFrom(region) as RegionCatalogItem),
              leagues: [buildCatalogItemBaseFrom(league) as LeagueCatalogItem],
            },
          ],
        });
        continue;
      }

      const regionCatalogItem = sportCatalogItem.regions.find((r) => r.uuid === region.uuid);
      if (!regionCatalogItem) {
        sportCatalogItem.regions.push({
          ...(buildCatalogItemBaseFrom(region) as RegionCatalogItem),
          leagues: [buildCatalogItemBaseFrom(league) as LeagueCatalogItem],
        });
        continue;
      }

      const leagueCatalogItem = regionCatalogItem.leagues.find((l) => l.uuid === league.uuid);
      if (!leagueCatalogItem) {
        regionCatalogItem.leagues.push(buildCatalogItemBaseFrom(league) as LeagueCatalogItem);
        continue;
      }

      throw new Error(`Duplicate catalog item found: ${league.name} in region ${region.name} for sport ${sport.name}`);
    }
  }

  allSports(): SportCatalogItem[] {
    return this.sports;
  }
  allRegions(): RegionCatalogItem[] {
    return this.sports.flatMap((sport) => sport.regions);
  }
  allUniqueRegions(): RegionCatalogItem[] {
    const regionMap = new Map<string, RegionCatalogItem>();
    for (const sport of this.sports) {
      for (const region of sport.regions) {
        if (!regionMap.has(region.uuid)) {
          regionMap.set(region.uuid, region);
        }
      }
    }
    return Array.from(regionMap.values());
  }
  allLeagues(): LeagueCatalogItem[] {
    return this.sports.flatMap((sport) => sport.regions.flatMap((region) => region.leagues));
  }

  findSport(uuid: string): SportCatalogItem | undefined {
    return this.sports.find((sport) => sport.uuid === uuid);
  }

  findRegion(uuid: string): RegionCatalogItem | undefined {
    return this.sports.flatMap((sport) => sport.regions.find((region) => region.uuid === uuid)).at(0);
  }

  findLeague(uuid: string): LeagueCatalogItem | undefined {
    return this.sports.flatMap((sport) => sport.regions.flatMap((region) => region.leagues.find((league) => league.uuid === uuid))).at(0);
  }

  filteredLeaguesBy(UUIDs: string[]): LeagueCatalogItem[] {
    return isAllArray(UUIDs)
      ? this.sports.flatMap((sport) => sport.regions.flatMap((region) => region.leagues))
      : this.sports.flatMap((sport) => (UUIDs.includes(String(sport.uuid)) ? sport.regions.flatMap((region) => region.leagues) : []));
  }
  filteredSportsBy(leagueUUIDs: string[]): SportCatalogItem[] {
    return isAllArray(leagueUUIDs)
      ? this.sports
      : this.sports.filter((sport) => sport.regions.find((region) => region.leagues.find((league) => leagueUUIDs.includes(league.uuid))));
  }
}

function buildCatalogItemBaseFrom<T extends BasicEntity>(item: T): BasicEntity {
  return { id: item.id, uuid: item.uuid, name: item.name };
}
