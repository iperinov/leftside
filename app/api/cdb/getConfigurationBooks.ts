import { getAppConfig } from "~/lib/runtimeConfig";
import type { BookPerConfiguration, CdbViewResponse } from "./cdb.types";
import type { BookRev } from "../sccs/types.gen";

export default async function getConfigurationBooks(configID: string): Promise<BookRev> {
  const cdbUrl = getAppConfig().cdb.baseUrl;

  //TODO: Make it more flexible /sccsdb/sccs - should be in config 
  const url = new URL(`/sccsdb/sccs/_design/books/_view/by_config?key=${configID}`, cdbUrl);
  console.log("getCOnfigurationBooks: ", cdbUrl, url);

  const response = await fetch(url, {
    method: "GET",
    credentials: "include", // Ensure cookies are sent if needed
  });

  if (!response.ok) {
    throw new Error("Failed to fetch catalog items");
  }
  const data: CdbViewResponse<BookRev> = await response.json();

  return data.rows.flatMap((item) => item.value).flatMap((item) => item.bookID);
}
