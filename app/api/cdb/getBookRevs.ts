import { getAppConfig } from "~/lib/runtimeConfig";
import type { BookRev } from "../sccs/types.gen";
import type { CbdBase, CdbViewResponse } from "./cdb.types";

type CdbBook = CbdBase & BookRev;

export default async function getBookRevs(): Promise<BookRev[]> {
  const cdbUrl = getAppConfig().cdb.baseUrl;
  const auth = getAppConfig().cdb.auth;

  //TODO: Make it more flexible /sccsdb/sccs - should be in config 
  const url = new URL("/sccsdb/sccs/_design/books/_view/by_id", cdbUrl);
  console.log("getBooks: ", cdbUrl, url);

  const response = await fetch(url, {
    method: "GET",
    credentials: "include", // Ensure cookies are sent if needed
  });

  if (!response.ok) throw new Error("Failed to fetch catalog items");

  const data: CdbViewResponse<CdbBook> = await response.json();

  return data.rows.flatMap((item) => item.value).map((item) => ({ id: item.id, rev: item.rev }));
}
