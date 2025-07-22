import { useQuery } from "@tanstack/react-query";
import { getConfigTeamsOptions } from "~/api/ocs/@tanstack/react-query.gen";
import type { TeamsFullArray } from "~/api/ocs/types.gen";
import { ocsClient } from "~/lib/clients/ocsClient";
import type { Team } from "~/types/sport/types";

function toTeams(data?: TeamsFullArray): Team[] {
  return data?.map(team => ({
    id: team.id,
    name: team.name,
    longName: team.lname,
  } as Team)) || [];
}

export const useTeams = () => {
  const result = useQuery({
    ...getConfigTeamsOptions({
      client: ocsClient,
      query: { id: [] }
    }),
  });
  return {...result, data: toTeams(result.data)};
};
