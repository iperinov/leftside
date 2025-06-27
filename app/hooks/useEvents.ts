import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../api/ocs/getEvents";
import { queryKeys } from "../lib/queryKeys";

export const useTeams = () => {
  return useQuery({
    queryKey: queryKeys.leagueByEvent(),
    queryFn: () => getEvents(),
  });
};
