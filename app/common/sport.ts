import type ItemData from "./IdAndLabelData";

export interface League extends ItemData {
}

export interface Sport extends ItemData {
  leagues: League[];
}
