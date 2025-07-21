import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import getConfigurations from "~/api/cdb/getConfigurations";

export const useConfigurations = () => {
  return useQuery({
    queryKey: queryKeys.configurations(),
    queryFn: getConfigurations,
    //staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
