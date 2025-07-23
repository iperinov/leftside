import { useQuery } from "@tanstack/react-query";
import { getConfigBooksOptions } from "~/api/ocs/@tanstack/react-query.gen";
import type { BookArray } from "~/api/ocs/types.gen";
import { client } from "~/lib/clients/ocs/client";
import type { Book } from "~/types/sport/types";

function toBooks(data?: BookArray): Book[] {
  return data
    ? data.map(
        (book) =>
          ({
            id: book.bid,
            name: book.name,
            webColumnId: book.wcid,
            enabled: book.enabled,
          }) as Book,
      )
    : [];
}

export const useBooks = () => {
  const result = useQuery({
    ...getConfigBooksOptions({ client: client }),
  });
  return { ...result, data: toBooks(result.data) };
};
