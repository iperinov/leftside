import { getBooks } from "~/api/ocs/getBooks";
import { queryClient } from "~/lib/queryClient";
import { queryKeys } from "~/lib/queryKeys";
import ConfigurationsPage from "../pages/ConfigurationsPage";
import type { Route } from "./+types/configurations";

export function meta() {
  return [{ title: "Schedule Admin - Configurations" }];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  queryClient.ensureQueryData({
    queryKey: queryKeys.books(),
    queryFn: () => getBooks([]),
  });
  return;
}

export default function Configurations() {
  return <ConfigurationsPage />;
}
