import { useQuery } from "@tanstack/react-query";
import { getTeams } from "../api/ocs/getTeams";
import { queryKeys } from "../lib/queryKeys";

export const useTeams = () => {
  return useQuery({
    queryKey: queryKeys.leagues(),
    queryFn: () => getTeams([]),
  });
};
