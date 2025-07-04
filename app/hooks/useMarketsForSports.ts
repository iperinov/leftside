import { allItem } from "~/components/categories/AllItemData";
import { useEvents } from "./useEvents";
import { useLeagueByEvent } from "./useLeagueByEvent";

export default function useMarketsForSports(sports: string[]) {
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
  if (sports?.length === 1 && sports[0] === allItem.id) {
    return { data: events, isLoading: isLoadingEvents, error: errorEvents };
  }

  const filteredLeaguesByEvents = leagueByEvent?.filter((lbe) =>
    sports.includes(String(lbe.realSportId)),
  );
  const marketsForSports = events?.filter((event) =>
    filteredLeaguesByEvents?.find((lbe) => lbe.id === event.id),
  );

  return {
    isLoading: isLoadingEvents || isLoadingLeagueByEvent,
    error: errorEvents || errorLeagueByEvent,
    data: marketsForSports || [],
  };
}
