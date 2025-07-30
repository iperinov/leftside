export interface CbdBase {
  _id: string;
  _rev: string;
}

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

export interface CatalogItem extends CbdBase {
  leagueID: number; // maps from `lid`
  leagueUUID: string; // maps from `uuid`
  realSportID: number; // maps from `rsid`
  realSportUUID: string; // maps from `rsuuid`
  regionID: number; // maps from `rid`
  regionUUID: string; // maps from `ruuid`
}

export interface BookPerConfiguration extends CbdBase {
  config: string; // maps from `config`
  id: number; // maps from `id`
}

export interface Configuration extends CbdBase {
  uuid: string;
  name: string;
  books: number[];
  rev: string;
  lmt: number;
  lmu: string;
}
