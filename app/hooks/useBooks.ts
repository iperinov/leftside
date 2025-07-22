import { useQuery } from "@tanstack/react-query";
import { getConfigBooksOptions } from "~/api/ocs/@tanstack/react-query.gen";
import { ocsClient } from "~/lib/clients/ocsClient";

export const useBooks = () => {
  return useQuery({
    ...getConfigBooksOptions({client: ocsClient}),
  });
};