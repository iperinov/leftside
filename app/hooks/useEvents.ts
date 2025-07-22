import { useQuery } from "@tanstack/react-query";
import { getConfigEventsOptions } from "~/api/ocs/@tanstack/react-query.gen";
import type { EventsArray } from "~/api/ocs/types.gen";
import { ocsClient } from "~/lib/clients/ocsClient";
import type { Event } from "~/types/sport/types";

function toEvents(data?: EventsArray): Event[] {
  return data ? data.map(event => ({
    id: event.eid,
    name: event.ed,
    date: event.egd,
  } as Event)) : [];
}

export const useEvents = () => {
  const result = useQuery({
    ...getConfigEventsOptions({client: ocsClient}),
  });
  return {...result, data: toEvents(result.data)};
};