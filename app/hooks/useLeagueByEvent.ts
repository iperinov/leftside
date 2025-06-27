import { useQuery } from "@tanstack/react-query";
import { getLeagueByEvent } from "../api/ocs/getLeagueByEvent";
import { queryKeys } from "../lib/queryKeys";

export const useTeams = () => {
  return useQuery({
    queryKey: queryKeys.leagueByEvent(),
    queryFn: () => getLeagueByEvent([]),
  });
};
