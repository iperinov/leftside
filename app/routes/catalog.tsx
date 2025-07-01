import { getRealSports } from "~/api/ocs/getRealSports";
import { getRegions } from "~/api/ocs/getRegions";
import { getTakeBackProfiles } from "~/api/ocs/getTakeBackProfiles";
import { queryClient } from "~/lib/queryClient";
import { queryKeys } from "~/lib/queryKeys";
import SportsCatalogPage from "../pages/SportsCatalogPage";
import type { Route } from "./+types/catalog";

export function meta() {
  return [{ title: "Schedule Admin - Catalogue" }];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  /* Real Sports */
  queryClient.ensureQueryData({
    queryKey: queryKeys.realSports(),
    queryFn: () => getRealSports(),
  });
  /* Regions */
  queryClient.ensureQueryData({
    queryKey: queryKeys.regions(),
    queryFn: () => getRegions(),
  });
  /* Leagues */
  queryClient.ensureQueryData({
    queryKey: queryKeys.regions(),
    queryFn: () => getRegions(),
  });
  /* TakeBackProfiles */
  queryClient.ensureQueryData({
    queryKey: queryKeys.takeBackProfiles(),
    queryFn: () => getTakeBackProfiles(),
  });
  return;
}

export default function Catalog() {
  return <SportsCatalogPage />;
}
