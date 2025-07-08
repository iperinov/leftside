import { allItem } from "~/components/categories/AllItemData";
import { useEvents } from "./useEvents";
import { useLeagueByEvent } from "./useLeagueByEvent";
import { useCatalog } from "./catalog/useCatalog";

export default function useFilteredMarketsBy(sportUUIDs: string[], leagueUUIDs: string[]) {
  const { data: events, isLoading: isLoadingEvents, error: errorEvents } = useEvents();
  const { data: leagueByEvent, isLoading: isLoadingLeagueByEvent, error: errorLeagueByEvent } = useLeagueByEvent();
  const { data: catalog, isLoading: isLoadingCatalog, error: errorCatalog } = useCatalog(); 

  const isAllSportsSelected = sportUUIDs.length === 1 && sportUUIDs[0] === allItem.id;
  const isAllLeaguesSelected = leagueUUIDs.length === 1 && leagueUUIDs[0] === allItem.id;
  if (isAllSportsSelected && isAllLeaguesSelected) {
    // all
    return { data: events, isLoading: isLoadingEvents, error: errorEvents };
  }

  const isLoading = isLoadingEvents || isLoadingLeagueByEvent || isLoadingCatalog;
  const error = errorEvents || errorLeagueByEvent || errorCatalog;
  if (isLoading || error) return { data: undefined, isLoading, error };
  if (!events || !leagueByEvent || !catalog) return { data: [], isLoading, error };

  const sportsForSelectedLeagues = catalog.filteredSportsBy(leagueUUIDs);
  const filteredSports = isAllSportsSelected
    ? sportsForSelectedLeagues.map((sport) => String(sport.id))
    : sportUUIDs.filter((sportUUID) => sportsForSelectedLeagues.find((sport) => sportUUID === sport.uuid));
  const filteredLeaguesByEvents = leagueByEvent?.filter((lbe) => filteredSports.includes(String(lbe.realSportId)));
  const marketsForSports = events?.filter((event) => filteredLeaguesByEvents?.find((lbe) => lbe.id === event.id));

  return {
    isLoading: isLoadingEvents || isLoadingLeagueByEvent,
    error: errorEvents || errorLeagueByEvent,
    data: marketsForSports || [],
  };
}
