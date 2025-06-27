import { useQuery } from "@tanstack/react-query";
import { getConfigurations } from "../api/scs/configurations/getConfigurations";
import { queryKeys } from "../lib/queryKeys";

export const useConfigurations = () => {
  return useQuery({
    queryKey: queryKeys.configurations(),
    queryFn: getConfigurations,
    //staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
