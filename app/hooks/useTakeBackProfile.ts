import { useQuery } from "@tanstack/react-query";
import { getTakeBackProfiles } from "../api/ocs/getTakeBackProfiles";
import { queryKeys } from "../lib/queryKeys";

export const useTakeBackProfile = () => {
  return useQuery({
    queryKey: queryKeys.takeBackProfiles(),
    queryFn: () => getTakeBackProfiles(),
  });
};
