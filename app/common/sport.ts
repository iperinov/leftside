export interface League {
  id: string;
  name: string;
}

export interface Sport {
  id: string;
  name: string;
  leagues: League[];
}
