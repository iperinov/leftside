import { useQuery } from "@tanstack/react-query";
import { config } from "process";
import getConfigurationBooks from "~/api/cdb/getConfigurationBooks";
import { queryKeys } from "~/lib/queryKeys";

export const useConfigurationBooks = (configUUID: string) => {
  return useQuery({
    queryKey: queryKeys.assignedBooks(configUUID),
    queryFn: () => getConfigurationBooks(configUUID),
  });
};
