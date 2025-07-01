export interface RealSport {
  id: number; // maps from `rsid`
  uuid: string; // maps from `lruuid`
  name: string; // maps from `rsd`
  gameDelayPregame: number; // maps from `gd`
  gameDelayLive: number; // maps from `gdl`

  // TODO: Missing in ocs/realsports/
  shortDesc?: string; // maps from `rssd`
  enabled: boolean; // maps from `enabled`
}

export interface RenameRealSportApiIn {
  uuid: string; // maps from `lruuid`
  name: string; // maps from `rsd`
}

export interface LeagueRegion {
  id: number; // maps from `rsid`
  uuid: string; // maps from `lruuid`
  name: string; // maps from `lrd`
  order: number; // maps from `lrro`
  enabled: boolean; // maps from `enabled`
}

export interface RenameLeagueRegionApiIn {
  uuid: string; // maps from `lruuid`
  name: string; // maps from `lrd`
}

export interface League {
  id: number; // maps from `lid`
  uuid: string; // maps from `uuid`
  name: string; // maps from `ln`
  shortDesc: string; // maps from `lsd`
  takeBackProfile: number; // maps from `tbp`
  realSportId: number; // maps from `rsid`
  sportId: string; // maps from `sid`
  hideForMaster: boolean; // maps from `hfm`
  regionId: number; // maps from `rid`
  regionUUID: string; // maps from `ruuid`

  // TODO: Missing in ocs/leagues/
  order?: number; // maps from `lrro`
  teamFKRequired?: boolean; // maps from `tfkr`
  enabled?: boolean; // maps from `enabled`
}

export interface RenameLeagueApiIn {
  uuid: string; // maps from `uuid`
  name: string; // maps from `ln`
}

export interface Team {
  id: number; // maps from `id`
  name: string; // maps from `name`
  longName: string; // maps from `lname`
}

export interface Event {
  id: number; // maps from `eid`
  description: string; // maps from `ed`
  gameDescription: string; // maps from `egd`
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
  id: number; // maps from `pid`
  moneyLine: number; // maps from `ml`
  spread: number; // maps from `sp`
  total: number; // maps from `tot`

  // TODO: Missing in ocs/realsports/
  description: string; // maps from `tbpd`
}
