import { useQuery } from "@tanstack/react-query";
import { getConfigRealsportsOptions } from "~/api/ocs/@tanstack/react-query.gen";
import type { RealSportsArray } from "~/api/ocs/types.gen";
import { ocsClient } from "~/lib/clients/ocsClient";
import type { RealSport } from "~/types/sport/types";

function toRealSport(data?: RealSportsArray): RealSport[] {
  return data?.map(sport => ({
    id: sport.rsid,
    uuid: sport.rsuuid,
    name: sport.rsd,
    gameDelayPregame: sport.gd,
    gameDelayLive: sport.gdl,
  } as RealSport)) || [];
}

export const useRealSports = () => {
  const result = useQuery({
    ...getConfigRealsportsOptions({
      client: ocsClient
    }),
  });
  return {...result, data: toRealSport(result.data)};
};

