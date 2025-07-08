import type { CatalogItem } from "~/api/cdb/cdb.types";
import type { BasicEntity, LeagueRegion as Region, League, RealSport } from "~/api/ocs/ocs.types";
import { allItem } from "~/components/categories/AllItemData";

export interface LeagueCatalogItem extends BasicEntity {}

export interface RegionCatalogItem extends BasicEntity {
  leagues: LeagueCatalogItem[];
}

export interface SportCatalogItem extends BasicEntity {
  regions: RegionCatalogItem[];
}

export interface CatalogActions {
  findSport(uuid: string): SportCatalogItem | undefined;
  findRegion(uuid: string): RegionCatalogItem | undefined;
  findLeague(uuid: string): LeagueCatalogItem | undefined;

  filteredLeaguesBy(sportUUIDs: string[]): LeagueCatalogItem[];
  filteredSportsBy(leagueUUIDs: string[]): SportCatalogItem[];
  //filteredRegionsBy(leagueUUIDs: string[]): BasicEntity[];
}

export class Catalog implements CatalogActions {
  sports: SportCatalogItem[];

  constructor(catalogItems: CatalogItem[], realSports: RealSport[], regions: Region[], leagues: League[]) {
    this.sports = [];
    catalogItems.forEach((item) => {
      const sport = realSports.find((s) => s.uuid === item.realSportUUID);
      const region = regions.find((r) => r.uuid === item.regionUUID);
      const league = leagues.find((l) => l.uuid === item.leagueUUID);
      if (!sport || !region || !league) return;

      let sportCatalogItem = this.sports.find((s) => s.uuid === sport.uuid);
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
        return;
      }

      let regionCatalogItem = sportCatalogItem.regions.find((r) => r.uuid === region.uuid);
      if (!regionCatalogItem) {
        sportCatalogItem.regions.push({
          ...(buildCatalogItemBaseFrom(region) as RegionCatalogItem),
          leagues: [buildCatalogItemBaseFrom(league) as LeagueCatalogItem],
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

  filteredLeaguesBy(sportUUIDs: string[]): LeagueCatalogItem[] {
    const isAllSportsSelected = sportUUIDs?.length === 1 && sportUUIDs[0] === allItem.id;
    return isAllSportsSelected
      ? this.sports.flatMap((sport) => sport.regions.flatMap((region) => region.leagues))
      : this.sports.flatMap((sport) => (sportUUIDs.includes(String(sport.uuid)) ? sport.regions.flatMap((region) => region.leagues) : []));
  }
  filteredSportsBy(leagueUUIDs: string[]): SportCatalogItem[] {
    const isAllLeaguesSelected = leagueUUIDs?.length === 1 && leagueUUIDs[0] === allItem.id;
    return isAllLeaguesSelected
      ? this.sports
      : this.sports.filter((sport) => sport.regions.find((region) => region.leagues.find((league) => leagueUUIDs.includes(String(league.uuid)))));
  }
}

function buildCatalogItemBaseFrom<T extends BasicEntity>(item: T): BasicEntity {
  return { id: item.id, uuid: item.uuid, name: item.name };
}
