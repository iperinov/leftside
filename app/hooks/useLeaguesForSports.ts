import { useLeagues } from "./useLeagues";
import { useRealSports } from "./useRealSport";

export default function useLeaguesForSports(sportIDs: string[]) {
    const { data: sports, isLoading: isLoadingSports, error: errorSports } = useRealSports();
    const { data: leagues, isLoading: isLoadingLeagues, error: errorLeagues } = useLeagues();
    const realSportIDs = sportIDs.map((uuid) => sports?.find((sport) => sport.uuid === uuid)?.id || 0);
    
    const filteredLeagues = leagues?.filter((league) => realSportIDs.includes(league.realSportId)) || [];

    return {
        data: filteredLeagues,
        isLoading: isLoadingSports || isLoadingLeagues,
        error: errorSports || errorLeagues,
    };
}