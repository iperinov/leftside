import { getAppConfig } from "~/lib/runtimeConfig";
import { mockCatalogItemsJson } from "../mock/cbd/mockBooks";
import type { BookPerConfiguration, CdbViewResponse } from "./cdb.types";

export default async function getAllConfigurationsBooks(): Promise<{ configID: string; books: number[] }[]> {
  const cdbUrl = getAppConfig().cdb.baseUrl;
  const auth = getAppConfig().cdb.auth;

  //TODO: Make it more flexible /sccsdb/sccs - should be in config
  const url = new URL("/sccsdb/sccs/_design/books/_view/by_config", cdbUrl);
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

  console.log("getAllConfigurationsBooks by_config", url, data);
  return Object.values(
    data.rows
      .map((item) => item.value)
      .reduce(
        (acc, value) => {
          const configID = value.config;
          const bookID = value.id;

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
