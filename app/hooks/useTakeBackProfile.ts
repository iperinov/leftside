import { useQuery } from "@tanstack/react-query";
import { getConfigTakeBackProfilesOptions, getConfigTakeBackProfilesQueryKey } from "~/api/ocs/@tanstack/react-query.gen";
import type { TakeBackProfileArray } from "~/api/ocs/types.gen";
import { client } from "~/lib/clients/ocs/client";
import type { TakeBackProfile } from "~/types/sport/types";

function toTakeBackProfile(data?: TakeBackProfileArray): TakeBackProfile[] {
  return (
    data?.map(
      (profile) =>
        ({
          id: profile.pid,
          moneyLine: profile.ml,
          spread: profile.sp,
          total: profile.tot,
          description: `${profile.pid} (ml: ${profile.ml}, sp: ${profile.sp}, tot: ${profile.tot})`, // TODO: replace wit hreal profile name
        }) as TakeBackProfile,
    ) || []
  );
}

export const useTakeBackProfile = () => {
  const result = useQuery({
    ...getConfigTakeBackProfilesOptions({ client: client }),
  });
  return { ...result, data: toTakeBackProfile(result.data) };
};
