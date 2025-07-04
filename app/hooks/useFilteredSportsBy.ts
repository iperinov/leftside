import { allItem } from "~/components/categories/AllItemData";
import { useLeagues } from "./useLeagues";
import { useRealSports } from "./useRealSport";

export default function useFilteredSportsBy(leagues: string[]) {
  const { data: allSports, isLoading: isLoadingSports, error: errorSports } = useRealSports();
  const { data: allLeagues, isLoading: isLoadingLeagues, error: errorLeagues } = useLeagues();

  if (leagues?.length === 1 && leagues[0] === allItem.id) {
    // all leagues case
    return {
      data: allLeagues,
      isLoading: isLoadingLeagues,
      error: errorLeagues,
    };
  }

  const isLoading = isLoadingSports || isLoadingLeagues;
  const error = errorSports || errorLeagues;
  if (isLoading || error) return { data: undefined, isLoading, error };
  if (!allLeagues || !allSports) return { data: [], isLoading, error };

  const realSports = leagues.flatMap((leagueID) => allLeagues?.find((league) => String(league.id) === leagueID)?.realSportId || []);

  return {
    data: allSports.filter((sport) => realSports.includes(sport.id)),
    isLoading: isLoadingSports || isLoadingLeagues,
    error: errorSports || errorLeagues,
  };
}
