import { useQuery } from "@tanstack/react-query";
import { getSportsCatalog } from "~/api/configs/sportCatalogApi";
import { sportCatalogQueryKey } from "~/common/queryKeys";

export default function useSportCatalog() {
  return useQuery({
    queryKey: sportCatalogQueryKey,
    queryFn: getSportsCatalog,
  });
}
