import { useQuery } from "@tanstack/react-query";
import type { FilterGroup } from "~/api/sccs/types.gen";
import { getContentFiltered } from "../api/ssm/getcontentFiltered";
import type { FilteredGamesResponse } from "../api/ssm/ssm.types";
import { queryKeys } from "../lib/queryKeys";

interface UseContentFilteredOptions {
  filterGroups: FilterGroup[];
  enabled?: boolean;
}

/**
 * Fetch filtered games content using a list of filter groups.
 */
export const useContentFiltered = ({ filterGroups, enabled = true }: UseContentFilteredOptions) => {
  return useQuery<FilteredGamesResponse>({
    queryKey: queryKeys.contentFiltered(filterGroups),
    queryFn: () => getContentFiltered({ filterGroups }),
    enabled,
  });
};
