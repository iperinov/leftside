import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import getAllConfigurationsBooks from "~/api/cdb/getAllConfiguraitonsBooks";

export const useAllConfigurationsBooks = () => {
  return useQuery({
    queryKey: queryKeys.configurationsBooks(),
    queryFn: getAllConfigurationsBooks,
  });
};
