import { allItem } from "~/components/categories/AllItemData";
import { useEvents } from "./useEvents";
import useFilteredSportsBy from "./useFilteredSportsBy";
import { useLeagueByEvent } from "./useLeagueByEvent";

export default function useFilteredMarketsBy(sports: string[], leagues: string[]) {
  const { data: events, isLoading: isLoadingEvents, error: errorEvents } = useEvents();
  const { data: leagueByEvent, isLoading: isLoadingLeagueByEvent, error: errorLeagueByEvent } = useLeagueByEvent();
  const { data: filteredSportsByLeagues, isLoading: isLoadingSports, error: errorSports } = useFilteredSportsBy(leagues);

  const isAllSportsSelected = sports.length === 1 && sports[0] === allItem.id;
  const isAllLeaguesSelected = leagues.length === 1 && leagues[0] === allItem.id;
  if (isAllSportsSelected && isAllLeaguesSelected) {
    // all
    return { data: events, isLoading: isLoadingEvents, error: errorEvents };
  }

  const isLoading = isLoadingEvents || isLoadingLeagueByEvent || isLoadingSports;
  const error = errorEvents || errorLeagueByEvent || errorSports;
  if (isLoading || error) return { data: undefined, isLoading, error };
  if (!events || !leagueByEvent || !filteredSportsByLeagues) return { data: [], isLoading, error };

  const filteredSports = isAllSportsSelected
    ? filteredSportsByLeagues.map((sport) => String(sport.id))
    : sports.filter((sportID) => filteredSportsByLeagues.find((sport) => sportID === String(sport.id)));
  const filteredLeaguesByEvents = leagueByEvent?.filter((lbe) => filteredSports.includes(String(lbe.realSportId)));
  const marketsForSports = events?.filter((event) => filteredLeaguesByEvents?.find((lbe) => lbe.id === event.id));

  return {
    isLoading: isLoadingEvents || isLoadingLeagueByEvent,
    error: errorEvents || errorLeagueByEvent,
    data: marketsForSports || [],
  };
}
