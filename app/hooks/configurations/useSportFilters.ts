import { useQuery } from "@tanstack/react-query";
import { getSportFilters } from "~/api/configs/sportFiltersApi";
import { sportFiltersQueryKey } from "~/common/queryKeys";

export default function useSportFilters() {
  return useQuery({
    queryKey: sportFiltersQueryKey,
    queryFn: getSportFilters,
  });
}






