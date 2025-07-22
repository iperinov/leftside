import { queryClient } from "~/lib/queryClient";
import { queryKeys } from "~/lib/queryKeys";
import SportsCatalogPage from "../pages/SportsCatalogPage";
import type { Route } from "./+types/catalog";

export function meta() {
  return [{ title: "Schedule Admin - Catalogue" }];
}

export default function Catalog() {
  return <SportsCatalogPage />;
}
