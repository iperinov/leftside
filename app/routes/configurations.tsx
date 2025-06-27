import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooks } from "~/api/ocs/getBooks";
import { useBooks } from "~/hooks/useBooks";
import { queryClient } from "~/lib/queryClient";
import { queryKeys } from "~/lib/queryKeys";
import ConfigurationsPage from "../pages/ConfigurationsPage";
import type { Route } from "./+types/configurations";

export function meta() {
  return [{ title: "Schedule Admin - Configurations" }];
}

export default function Configurations() {
  return <ConfigurationsPage />;
}
