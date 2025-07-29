import { useQuery } from "@tanstack/react-query";
import { getConfigEventsOptions } from "~/api/ocs/@tanstack/react-query.gen";
import type { EventsArray } from "~/api/ocs/types.gen";
import { client } from "~/lib/clients/ocs/client";
import type { Event } from "~/types/sport/types";

function toEvents(data?: EventsArray): Event[] {
  return data
    ? data.map(
        (event) =>
          ({
            id: event.eid,
            description: event.ed,
            gameDescription: event.egd,
          }) as Event,
      )
    : [];
}

export const useEvents = () => {
  const result = useQuery({
    ...getConfigEventsOptions({ client: client }),
  });
  return { ...result, data: toEvents(result.data) };
};
