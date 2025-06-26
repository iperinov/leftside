import type ItemData from "./ItemData";

export interface League extends ItemData {
}

export interface Sport extends ItemData {
  leagues: League[];
}
