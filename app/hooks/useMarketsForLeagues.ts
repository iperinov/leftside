import { allStringItemData } from "~/components/categories/ItemData";
import { useEvents } from "./useEvents";
import { useLeagueByEvents } from "./useLeagueByEvent";

export interface EventEx extends Event {
  id: number; // maps from `eid`
  description: string; // maps from `ed`
  gameDescription: string; // maps from `egd`
  leagueId: number; // maps from `lid`
  realSportId: number; // maps from `rsid`
  gameTypeId: number; // maps from `gtid`
}

export default function useMarketsForLeagues(leagues: string[]) {
  const { data: events, isLoading: isLoadingEvents, error: errorEvents } = useEvents();
  const { data: leagueByEvents, isLoading: isLoadingLeagueByEvents, error: errorLeagueByEvents } = useLeagueByEvents();
  if (leagues?.length === 1 && leagues[0] === allStringItemData.id) {
      return { data: events, isLoading: isLoadingEvents, error: errorEvents } 
  }

  const combinedEvents = events
    ?.map((event) => {
      const leagueByEvent = leagueByEvents?.find((lbe) => lbe.eventId === event.id);
      return {
        ...event,
        leagueId: leagueByEvent?.leagueId || 0,
        realSportId: leagueByEvent?.realSportId || 0,
        gameTypeId: leagueByEvent?.gameTypeId || 0,
      } as EventEx;
    })
    .filter((event) => leagues.length === 0 || leagues.includes(String(event.leagueId)));

  return {
    isLoading: isLoadingEvents || isLoadingLeagueByEvents,
    error: errorEvents || errorLeagueByEvents,
    data: combinedEvents || [],
  };
}
