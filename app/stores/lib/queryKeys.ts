export const queryKeys = {
  configurations: () => ["configurations"] as const,
  configurationsBooks: () => ["configurations-books"] as const,
  assignedBooks: (configID: string) => ["assigned-books", configID] as const,
  bookRevs: () => ["book-revs"] as const,
  // realSports: () => ["real-sports"] as const,
  // regions: () => ["regions"] as const,
  // leagues: () => ["leagues"] as const,
  events: () => ["events"] as const,
  leagueByEvent: () => ["league-by-event"] as const,
  takeBackProfiles: () => ["take-back-profiles"] as const,
  contentFiltered: (filters: unknown) => ["content-filtered", filters] as const,
  configurationCategories: (configID: string) => ["configuration-categories", configID] as const,
  catalogItems: () => ["catalog-items"] as const,
};
