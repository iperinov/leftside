import { getAppConfig } from "~/lib/runtimeConfig";
import type { CdbViewResponse } from "./cdb.types";
import type { BookRev } from "../sccs/types.gen";

interface CdbBookRev extends BookRev {}

export default async function getConfigurationBooks(configUUID: string): Promise<BookRev[]> {
  const cdbUrl = getAppConfig().cdb.baseUrl;

  //TODO: Make it more flexible /sccsdb/sccs - should be in config
  const url = new URL(`/sccsdb/sccs/_design/books/_view/by_config?key=${configUUID}`, cdbUrl);
  console.log("getConfigurationBooks: ", cdbUrl, url);

  const response = await fetch(url, {
    method: "GET",
    credentials: "include", // Ensure cookies are sent if needed
  });

  if (!response.ok) {
    throw new Error("Failed to fetch catalog items");
  }
  const data: CdbViewResponse<CdbBookRev> = await response.json();

  return data.rows.flatMap((item) => ({id: item.value.id, rev: item.value.rev}))
}
