import { getAppConfig } from "~/lib/runtimeConfig";
import { mockCatalogItemsJson } from "../mock/cbd/mockBooks";
import type { BookPerConfiguration, CdbViewResponse } from "./cdb.types";

export default async function getAllConfigurationsBooks(): Promise<{ configID: string; books: number[] }[]> {
  const cdbUrl = getAppConfig().cdb.baseUrl;
  const auth = getAppConfig().cdb.auth;

  const url = new URL("sccs/_design/books/_view/by_config", cdbUrl);
  console.log("getBooks: ", cdbUrl, url);

  // MOCK:
  // await new Promise((res) => setTimeout(res, 500));
  // const data = JSON.parse(mockCatalogItemsJson) as CdbViewResponse<BookPerConfiguration>;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include", // Ensure cookies are sent if needed
  });

  if (!response.ok) {
    throw new Error("Failed to fetch catalog items");
  }
  const data: CdbViewResponse<BookPerConfiguration> = await response.json();

  return Object.values(
    data.rows
      .map((item) => item.value)
      .reduce(
        (acc, { configID, bookID }) => {
          if (!acc[configID]) {
            acc[configID] = { configID, books: [] };
          }
          acc[configID].books.push(bookID);
          return acc;
        },
        {} as Record<string, { configID: string; books: number[] }>,
      ),
  );
}
