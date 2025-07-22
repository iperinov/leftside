export interface BasicEntity {
  id: number; // ORO id
  uuid: string; // UUID
  name: string;
}

export interface RealSport extends BasicEntity {
  gameDelayPregame: number; // maps from `gd`
  gameDelayLive: number; // maps from `gdl`

  // TODO: Missing in ocs/realsports/
  shortDesc?: string; // maps from `rssd`
  enabled?: boolean; // maps from `enabled`
}

export interface RenameRealSportApiIn {
  uuid: string; // maps from `lruuid`
  name: string; // maps from `rsd`
}

export interface LeagueRegion extends BasicEntity {
  order: number; // maps from `lrro`
  enabled: boolean; // maps from `enabled`
}

export interface RenameLeagueRegionApiIn {
  uuid: string; // maps from `lruuid`
  name: string; // maps from `lrd`
}

export interface League extends BasicEntity {
  shortDesc: string; // maps from `lsd`
  takeBackProfile: number; // maps from `tbp`
  realSportId: number; // maps from `rsid`
  realSportUUID?: string; // maps from `rsuuid`
  sportId: string; // maps from `sid`
  hideForMaster?: boolean; // maps from `hfm`

  // TODO: Missing in ocs/leagues/
  regionId?: number; // maps from `rid`
  regionUUID?: string; // maps from `ruuid`
  order?: number; // maps from `lrro`
  teamFKRequired?: boolean; // maps from `tfkr`
  enabled?: boolean; // maps from `enabled`
}

export interface Team {
  id: number; // maps from `id`
  name: string; // maps from `name`
  longName: string; // maps from `lname`
}

export interface Event {
  id?: number; // maps from `eid`
  description?: string; // maps from `ed`
  gameDescription?: string; // maps from `egd`
}

export interface LeagueByEvent {
  id: number; // maps from `eid`
  leagueId: number; // maps from `lid`
  leagueUUID: string; // maps from `luuid`
  realSportId: number; // maps from `rsid`
  realSportUUID: string; // maps from `rsuuid`
  gameTypeId: number; // maps from `gtid`
}

export interface TakeBackProfile {
  id?: number; // maps from `pid`
  moneyLine?: number; // maps from `ml`
  spread?: number; // maps from `sp`
  total?: number; // maps from `tot`

  // TODO: Missing in ocs/realsports/
  description?: string; // maps from `tbpd`
}

export interface Book {
  id: number; // maps from 'bid'
  name: string; // maps from 'name'
  webColumnId: number; // maps from 'wcid'
  enabled: boolean; // maps from 'enabled'
}
