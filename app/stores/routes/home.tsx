import { redirect, useNavigation } from "react-router";
import { loadRuntimeConfig } from "~/lib/runtimeConfig";
import { useAuthStore } from "~/stores/useAuthStore";
import type { Route } from "./+types/home";

export function meta() {
  return [{ title: "Schedule Admin - Home" }];
}

export async function clientLoader(_args: Route.ClientActionArgs) {
  await loadRuntimeConfig();

  return useAuthStore.getState().isLoggedIn() ? redirect("/catalog") : redirect("/auth");
}

export default function Home() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return <>{isLoading ?? <div>Loading...</div>}</>;
}
