import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/lib/queryKeys";
import { useRealSports } from "../useRealSport";
import { useLeagues } from "../useLeagues";
import { useRegions } from "../useRegions";
import getCatalogItems from "~/api/cdb/getCatalogItems";
import { Catalog } from "~/types/catalog/Catalog";

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
      return new Catalog(catalogItems, realSports!, regions!, realLeagues!);
    },
    enabled: !isLoading && !error && realSports !== undefined && realLeagues !== undefined && regions !== undefined,
  });

  return {
    data: query.data,
    isLoading: isLoading || query.isLoading,
    error: error || query.error,
  };
};
