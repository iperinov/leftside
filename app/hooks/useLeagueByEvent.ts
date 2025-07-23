import { useQuery } from "@tanstack/react-query";
import { getConfigLeaguesByEventsOptions } from "~/api/ocs/@tanstack/react-query.gen";
import type { LeagueByEventArray } from "~/api/ocs/types.gen";
import { client } from "~/lib/clients/ocs/client";
import type { LeagueByEvent } from "~/types/sport/types";

function toLeagueByEvent(data?: LeagueByEventArray): LeagueByEvent[] {
  return (
    data?.map(
      (item) =>
        ({
          id: item.eid,
          leagueId: item.lid,
          leagueUUID: item.luuid,
          realSportId: item.rsid,
          realSportUUID: item.rsuuid,
          gameTypeId: item.gtid,
        }) as LeagueByEvent,
    ) || []
  );
}

export const useLeagueByEvent = () => {
  const result = useQuery({
    ...getConfigLeaguesByEventsOptions({ client: client }),
  });
  return { ...result, data: toLeagueByEvent(result.data) };
};
