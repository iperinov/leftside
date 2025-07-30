import { useQuery } from "@tanstack/react-query";
import getCatalogItems from "~/api/cdb/getCatalogItems";
import { queryKeys } from "~/lib/queryKeys";
import { Catalog } from "~/types/catalog/Catalog";
import { useLeagues } from "../useLeagues";
import { useRealSports } from "../useRealSport";
import { useRegions } from "../useRegions";

export const useCatalog = () => {
  const { data: realSports, isLoading: isLoadingRealSports, error: errorSports } = useRealSports();
  const { data: realLeagues, isLoading: isLoadingRealLeagues, error: errorLeagues } = useLeagues();
  const { data: regions, isLoading: isLoadingRegions, error: errorRegions } = useRegions();

  const isLoading = isLoadingRealSports || isLoadingRealLeagues || isLoadingRegions;
  const error = errorSports || errorLeagues || errorRegions;

  const query = useQuery({
    queryKey: queryKeys.catalogItems(),
    queryFn: async () => {
      const catalogItems = await getCatalogItems();
      return new Catalog(catalogItems, realSports || [], regions || [], realLeagues || []);
    },
    enabled: !isLoading && !error && realSports !== undefined && realLeagues !== undefined && regions !== undefined,
  });

  return {
    data: query.data,
    isLoading: isLoading || query.isLoading,
    error: error || query.error,
  };
};
