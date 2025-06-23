import { useQuery } from "@tanstack/react-query";
import getListOfSportFilters from "~/api/configs/sportFiltersApi";

export default function useSportFilters() {
  return useQuery({
    queryKey: ["sportFilters"],
    queryFn: getListOfSportFilters,
  });
}
