import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api/ocs/getBooks";
import { queryKeys } from "../lib/queryKeys";

export const useBooks = () => {
  return useQuery({
    queryKey: queryKeys.books(),
    queryFn: () => getBooks([]),
    //staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
