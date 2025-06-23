import { useQuery } from "@tanstack/react-query";
import getListOfSportFilters from "~/api/configs/getListOfSportFilters";

export default function useSportFilters() {
  return useQuery({
    queryKey: ["sportFilters"],
    queryFn: getListOfSportFilters,
  });
}
