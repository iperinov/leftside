import { useQuery } from "@tanstack/react-query";
import getAllConfigurationsBooks from "~/api/cdb/getAllConfiguraitonsBooks";
import { queryKeys } from "../lib/queryKeys";

export const useAllConfigurationsBooks = () => {
  return useQuery({
    queryKey: queryKeys.configurationsBooks(),
    queryFn: getAllConfigurationsBooks,
  });
};
