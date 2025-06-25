import useSportCatalog from "./sportCatalog/useSportCatalog";
import useSportFilters from "./sportConfigs/useSportFilters";

export default function useSports() {
  const { isLoading: isSportFiltersLoading, data: sportFilters, error: sportFilterError } = useSportFilters();
  const { isLoading: isSportCatalogLoading, data: sportCatalog, error: sportCatalogError } = useSportCatalog();

  return {
    isLoading: isSportFiltersLoading || isSportCatalogLoading,
    filters: sportFilters,
    catalog: sportCatalog,
    error: sportFilterError || sportCatalogError,
  };
}
