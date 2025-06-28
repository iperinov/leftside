import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import { getRealSports } from "~/api/ocs/getRealSports";

export const useRealSports = () => {
  return useQuery({
    queryKey: queryKeys.sports(),
    queryFn: () => getRealSports(),
  });
};
