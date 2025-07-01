export interface Filter {
  type:
    | "sport"
    | "region"
    | "league"
    | "game"
    | "period"
    | "market"
    | "time"
    | "status";
  value: string;
}

export interface FilterGroup {
  filters: Filter[];
  groupBy?: ("league" | "date")[];
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
  banners?: {
    description: string;
    top: string;
    bottom: string;
  }[];
  realSportName: string;
  leagueName: string;
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
