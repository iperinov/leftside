export const queryKeys = {
  configurations: () => ["configurations"] as const,
  books: () => ["books"] as const,
  sports: () => ["sports"] as const,
  regions: () => ["regions"] as const,
  leagues: () => ["leagues"] as const,
  events: () => ["events"] as const,
  leagueByEvent: () => ["league-by-event"] as const,
  takeBackProfiles: () => ["take-back-profiles"] as const,
  configurationCategories: (configID: string) => ["configuration-categories", configID] as const,
};
