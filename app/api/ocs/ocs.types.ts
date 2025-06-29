export interface RealSport {
  id: number; // maps from `rsid`
  uuid: string; // maps from `lruuid`
  name: string; // maps from `rsd`
  gameDelayPregame: number; // maps from `gd`
  gameDelayLive: number; // maps from `gdl`
}

export interface LeagueRegion {
  id: number; // maps from `rsid`
  uuid: string; // maps from `lruuid`
  name: string; // maps from `lrd`
  order: number; // maps from `lrro`
  enabled: boolean; // maps from `lre`
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
  eventId: number; // maps from `eid`
  leagueId: number; // maps from `lid`
  realSportId: number; // maps from `rsid`
  gameTypeId: number; // maps from `gtid`
}

export interface TakeBackProfile {
  id: number; // maps from `pid`
  moneyLine: number; // maps from `ml`
  spread: number; // maps from `sp`
  total: number; // maps from `tot`
}
