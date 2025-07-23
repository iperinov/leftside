import { useQuery } from "@tanstack/react-query";
import { getConfigRegionsOptions } from "~/api/ocs/@tanstack/react-query.gen";
import type { LeagueRegionArray } from "~/api/ocs/types.gen";
import { ocsClient } from "~/lib/clients/ocsClient";
import type { LeagueRegion } from "~/types/sport/types";

function toRegion(data?: LeagueRegionArray): LeagueRegion[] {
  return (
    data?.map(
      (region) =>
        ({
          id: region.lrid,
          uuid: region.lruuid,
          name: region.lrd,
          order: region.lrro,
          enabled: region.lre,
        }) as LeagueRegion,
    ) || []
  );
}

export const useRegions = () => {
  const result = useQuery({
    ...getConfigRegionsOptions({ client: ocsClient }),
  });
  return { ...result, data: toRegion(result.data) };
};
