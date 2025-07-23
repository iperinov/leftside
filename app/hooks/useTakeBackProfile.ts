import { useQuery } from "@tanstack/react-query";
import { getConfigTakeBackProfilesOptions, getConfigTakeBackProfilesQueryKey } from "~/api/ocs/@tanstack/react-query.gen";
import type { TakeBackProfileArray } from "~/api/ocs/types.gen";
import { ocsClient } from "~/lib/clients/ocsClient";
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
        }) as TakeBackProfile,
    ) || []
  );
}

export const useTakeBackProfile = () => {
  const result = useQuery({
    ...getConfigTakeBackProfilesOptions({ client: ocsClient }),
  });
  return { ...result, data: toTakeBackProfile(result.data) };
};
