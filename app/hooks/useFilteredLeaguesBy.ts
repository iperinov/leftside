import { allItem } from "~/components/categories/AllItemData";
import { useLeagues } from "./useLeagues";
import { useRealSports } from "./useRealSport";

export default function useFilteredLeaguesBy(sportIDs: string[]) {
  const { data: sports, isLoading: isLoadingSports, error: errorSports } = useRealSports();
  const { data: leagues, isLoading: isLoadingLeagues, error: errorLeagues } = useLeagues();
  if (sportIDs?.length === 1 && sportIDs[0] === allItem.id) {
    return { data: leagues, isLoading: isLoadingLeagues, error: errorLeagues };
  }

  const realSportIDs = sportIDs.map((id) => sports?.find((sport) => String(sport.id) === id)?.id || 0);

  const filteredLeagues = leagues?.filter((league) => realSportIDs.includes(league.realSportId)) || [];

  return {
    data: filteredLeagues,
    isLoading: isLoadingSports || isLoadingLeagues,
    error: errorSports || errorLeagues,
  };
}
