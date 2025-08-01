import type { FiltersTypeString, LeagueFilter, SportFilter } from "~/api/sccs/types.gen";
import { allItemString, isAllFilter } from "~/components/categories/AllItemData";
import { useCatalog } from "./catalog/useCatalog";
import { useEvents } from "./useEvents";
import { useLeagueByEvent } from "./useLeagueByEvent";

export default function useFilteredMarketsBy(sportFilter?: SportFilter, leagueFilter?: LeagueFilter) {
  const { data: events, isLoading: isLoadingEvents, error: errorEvents } = useEvents();
  const { data: leagueByEvent, isLoading: isLoadingLeagueByEvent, error: errorLeagueByEvent } = useLeagueByEvent();
  const { data: catalog, isLoading: isLoadingCatalog, error: errorCatalog } = useCatalog();

  const isAllSportsSelected = !sportFilter || isAllFilter(sportFilter.value);
  const isAllLeaguesSelected = !leagueFilter || isAllFilter(leagueFilter.value) || (leagueFilter.value as FiltersTypeString).length === 0;
  if (isAllSportsSelected && isAllLeaguesSelected) {
    // all
    return { data: events, isLoading: isLoadingEvents, error: errorEvents };
  }

  const isLoading = isLoadingEvents || isLoadingLeagueByEvent || isLoadingCatalog;
  const error = errorEvents || errorLeagueByEvent || errorCatalog;
  if (isLoading || error) return { data: undefined, isLoading, error };
  if (!events || !leagueByEvent || !catalog) return { data: [], isLoading, error };

  const sportsForSelectedLeagues = catalog.filteredSportsBy(isAllLeaguesSelected ? [allItemString.id] : (leagueFilter.value as string[]));
  const filteredSports = isAllSportsSelected
    ? sportsForSelectedLeagues.map((sport) => String(sport.id))
    : (sportFilter.value as string[]).filter((sportUUID) => sportsForSelectedLeagues.find((sport) => sportUUID === sport.uuid));
  const filteredLeaguesByEvents = leagueByEvent?.filter((lbe) => filteredSports.includes(lbe.realSportUUID));
  const marketsForSports = events?.filter((event) => filteredLeaguesByEvents?.find((lbe) => lbe.id === event.id));

  return {
    isLoading: isLoadingEvents || isLoadingLeagueByEvent,
    error: errorEvents || errorLeagueByEvent,
    data: marketsForSports || [],
  };
}
