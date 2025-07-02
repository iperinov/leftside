import { getAppConfig } from "~/lib/runtimeConfig";
import { mockBooks } from "./mock/mockBooks";
import type { Book } from "./ocs.types";

const ocsBaseUrl = getAppConfig().ocs.baseUrl;

export const getBooks = async (bookIds?: number[]): Promise<Book[]> => {
  const url = new URL(`${ocsBaseUrl}/config/books/`);
  console.log("getBooks: ", url, bookIds);
  await new Promise((res) => setTimeout(res, 2000)); // Simulate delay

  // TODO:
  //    * Replace with real API call
  //    * Handle error codes
  //   if (bookIds?.length) {
  //     bookIds.forEach(id => url.searchParams.append('bid', id.toString()));
  //   }

  //   const response = await fetch(url.toString());

  //   if (!response.ok) {
  //     const errorText = await response.text();
  //     throw new Error(`Failed to fetch books: ${response.status} ${errorText}`);
  //   }

  //   const rawData = await response.json();

  //   return rawData.map((book: any) => ({
  //     id: book.bid,
  //     name: book.name,
  //     webColumnId: book.wcid,
  //     enabled: book.enabled,
  //   })) as Book[];
  return mockBooks;
};
