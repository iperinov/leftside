import { useQuery } from "@tanstack/react-query";
import { getConfigurationCategories } from "~/api/scs/categories/getConfigurationCategories";
import { queryKeys } from "~/lib/queryKeys";

export const useConfigurationCategories = (configurationUUID: string) => {
  return useQuery({
    queryKey: queryKeys.configurationCategories(),
    queryFn: () => getConfigurationCategories(configurationUUID),
  });
};