import { allItemData } from "~/components/categories/ItemData";
import { useEvents } from "./useEvents";
import { useLeagueByEvents } from "./useLeagueByEvent";

export default function useMarketsForLeagues(leagues: string[]) {
  const { data: events, isLoading: isLoadingEvents, error: errorEvents } = useEvents();
  const { data: leagueByEvents, isLoading: isLoadingLeagueByEvents, error: errorLeagueByEvents } = useLeagueByEvents();
  if (leagues?.length === 1 && leagues[0] === allItemData.id) {
    return { data: events, isLoading: isLoadingEvents, error: errorEvents };
  }

  const filteredLeaguesByEvents = leagueByEvents?.filter((lbe) => leagues.includes(String(lbe.leagueId)));
  const marketsForLeagues = events?.filter((event) => filteredLeaguesByEvents?.find((lbe) => lbe.id === event.id) );

  return {
    isLoading: isLoadingEvents || isLoadingLeagueByEvents,
    error: errorEvents || errorLeagueByEvents,
    data: marketsForLeagues || [],
  };
}
