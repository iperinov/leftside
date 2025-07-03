import { allItem } from "~/components/categories/AllItemData";
import { useEvents } from "./useEvents";
import { useLeagueByEvent } from "./useLeagueByEvent";

export default function useMarketsForLeagues(leagues: string[]) {
  const {
    data: events,
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useEvents();
  const {
    data: leagueByEvent,
    isLoading: isLoadingLeagueByEvent,
    error: errorLeagueByEvent,
  } = useLeagueByEvent();
  if (leagues?.length === 1 && leagues[0] === allItem.id) {
    return { data: events, isLoading: isLoadingEvents, error: errorEvents };
  }

  const filteredLeaguesByEvents = leagueByEvent?.filter((lbe) =>
    leagues.includes(String(lbe.leagueId)),
  );
  const marketsForLeagues = events?.filter((event) =>
    filteredLeaguesByEvents?.find((lbe) => lbe.id === event.id),
  );

  return {
    isLoading: isLoadingEvents || isLoadingLeagueByEvent,
    error: errorEvents || errorLeagueByEvent,
    data: marketsForLeagues || [],
  };
}
