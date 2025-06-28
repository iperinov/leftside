import { useQuery } from "@tanstack/react-query";
import { getRegions } from "../api/ocs/getRegions";
import { queryKeys } from "../lib/queryKeys";

export const useReegions = () => {
  return useQuery({
    queryKey: queryKeys.regions(),
    queryFn: () => getRegions(),
  });
};
