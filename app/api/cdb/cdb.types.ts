interface CbdBase {
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

[
    {
      "id": "cfg-DB9CAEBE-31C6-4116-9051-E1D7978BC3D7",
      "key": "DB9CAEBE-31C6-4116-9051-E1D7978BC3D7",
      "value": {
        "_id": "cfg-DB9CAEBE-31C6-4116-9051-E1D7978BC3D7",
        "_rev": "20-6f99618836e0075523bf4636ad2a6a51",
        "type": "cfg",
        "categories": [],
        "name": "Premier League Weekend Config",
        "uuid": "DB9CAEBE-31C6-4116-9051-E1D7978BC3D7"
      }
    }
  ]

export interface Configuration extends CbdBase {
  uuid: string;
  name: string;
  books: number[];
  lmt: number;
  lmu: string;
}