export interface Filter {
  type: "sport" | "region" | "league" | "game" | "period" | "market" | "time" | "status";
  value: string[];
}

export interface FilterGroup {
  filters: Filter[];
  groupBy?: "league" | "date" | "league.date" | "date.league" | "sport.league" | "sport.date" | "date.game";
  order?: "asc" | "desc";
  limit?: number;
}

export interface Game {
  type: "2way" | "3way" | "tnt";
  idGame: number;
  gameUUID: string;
  parentUUID: string;
  realSportUUID: string;
  leagueUUID: string;
  idSport: string;
  eventId?: number;
  description?: string;
  periodId?: number;
  //regionId?: number;
  banners?: {
    description: string;
    top: string;
    bottom: string;
  }[];
  realSportName: string;
  leagueName: string;
  //regionName: string;
  contenders: {
    id: number;
    name: string;
  }[];
  propCount: number;
  liveGame: boolean;
  startTime: string; // ISO 8601 date-time format
  allowhookups: boolean;
  periodDescription: string;
}

export interface FilteredGamesResponse {
  status: number;
  description: string;
  games: Game[];
}

export enum GroupBy {
  League = "league",
  Date = "date",
  LeagueDate = "league.date",
  DateLeague = "date.league",
  SportLeague = "sport.league",
  SportDate = "sport.date",
  DateGame = "date.game",
}

export enum Order {
  Asc = "asc",
  Desc = "desc",
}
