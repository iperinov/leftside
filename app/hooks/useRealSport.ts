import { useQuery } from "@tanstack/react-query";
import { getRealSports } from "../api/ocs/getRealSports";
import { queryKeys } from "../lib/queryKeys";

export const useRealSport = () => {
  return useQuery({
    queryKey: queryKeys.realSports(),
    queryFn: () => getRealSports(),
  });
};
