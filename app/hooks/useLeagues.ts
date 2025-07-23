import { useQuery } from "@tanstack/react-query";
import { getConfigLeaguesOptions } from "~/api/ocs/@tanstack/react-query.gen";
import type { LeagueArray } from "~/api/ocs/types.gen";
import { ocsClient } from "~/lib/clients/ocsClient";
import type { League } from "~/types/sport/types";

function toLeague(data?: LeagueArray): League[] {
  return (
    data?.map(
      (league) =>
        ({
          id: league.lid,
          uuid: league.luuid,
          name: league.ln,
          shortDesc: league.lsd,
          takeBackProfile: league.tbp,
          realSportId: league.rsid,
          realSportUUID: league.rsuuid,
          sportId: league.sid,
          hideForMaster: league.hfm,
        }) as League,
    ) || []
  );
}

export const useLeagues = () => {
  const result = useQuery({
    ...getConfigLeaguesOptions({ client: ocsClient }),
  });
  return { ...result, data: toLeague(result.data) };
};
