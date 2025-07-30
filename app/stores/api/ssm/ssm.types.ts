import type { FilterGroup } from "../sccs/types.gen";

export interface Contender {
  id: number;
  name: string;
}

export interface Banner {
  description: string;
  top: string;
  bottom: string;
}

export interface Game {
  type: "2way" | "3way" | "tnt";
  idGame: number;
  gameUUID: string;
  parentUUID: string;
  realSportUUID: string;
  //regionUUID: string;
  leagueUUID: string;
  idSport: string;
  eventId?: number;
  description?: string;
  periodId: number;
  //regionId?: number;
  banners: Banner[];
  realSportName: string;
  leagueName: string;
  //regionName: string;
  contenders: Contender[];
  propCount: number;
  liveGame: boolean;
  startTime: string; // ISO 8601 date-time format
  allowhookups: boolean;
  periodDescription: string;
}

export interface FilteredGameGroup {
  filterGroup: FilterGroup;
  games: Game[];
}

export interface FilteredGamesResponse {
  status: number;
  description: string;
  groups: FilteredGameGroup[];
}
