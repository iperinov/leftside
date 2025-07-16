interface CdbViewRow<T> {
  id: string;
  key: string;
  value: T;
}
export interface CdbViewResponse<T> {
  total_rows: number;
  offset: number;
  rows: CdbViewRow<T>[];
}

export interface CatalogItem {
  leagueID: number; // maps from `lid`
  leagueUUID: string; // maps from `uuid`
  realSportID: number; // maps from `rsid`
  realSportUUID: string; // maps from `rsuuid`
  regionID: number; // maps from `rid`
  regionUUID: string; // maps from `ruuid`
}
