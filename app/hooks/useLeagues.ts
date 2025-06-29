import { useQuery } from "@tanstack/react-query";
import { getLeagues } from "../api/ocs/getLeagues";
import { queryKeys } from "../lib/queryKeys";

export const useLeagues = () => {
  return useQuery({
    queryKey: queryKeys.leagues(),
    queryFn: () => getLeagues(),
  });
};
