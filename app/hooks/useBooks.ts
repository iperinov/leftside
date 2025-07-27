import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import getBookRevs from "~/api/cdb/getBookRevs";
import getBooks from "~/api/cdb/getBookRevs";
import { getConfigBooksOptions } from "~/api/ocs/@tanstack/react-query.gen";
import type { BookArray } from "~/api/ocs/types.gen";
import { client } from "~/lib/clients/ocs/client";
import { queryKeys } from "~/lib/queryKeys";
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
          } as Book)
      )
    : [];
}

export const useBooks = () => {
  const {
    data: bookNames,
    isLoading: isNamesLoading,
    error: errorNames,
  } = useQuery({
    ...getConfigBooksOptions({ client: client }),
  });
  const {
    data: bookRevs,
    isLoading: revsLoading,
    error: errorRevs,
  } = useQuery({
    queryKey: queryKeys.bookRevs(),
    queryFn: getBookRevs,
  });


  const data: Book[] | undefined =
    bookNames && bookRevs
      ? bookNames.map(
          (name) =>
            ({
              id: name.bid,
              name: name.name,
              webColumnId: name.wcid,
              enabled: name.enabled,
              rev: bookRevs.find((rev) => rev.id === name.bid)?.rev || "",
            } as Book)
        )
      : undefined;

  return { data, isLoading: isNamesLoading || revsLoading, error: errorNames || errorRevs };
};
