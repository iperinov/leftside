import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../api/ocs/getEvents";
import { queryKeys } from "../lib/queryKeys";

export const useEvents = () => {
  return useQuery({
    queryKey: queryKeys.events(),
    queryFn: () => getEvents(),
  });
};
