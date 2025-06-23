import { redirect } from "react-router";
import { useAuthStore } from "~/stores/useAuthStore";
import type { Route } from "./+types/home";

export function meta() {
  return [{ title: "Schedule Admin - Home" }];
}

export async function clientLoader({ params }: Route.ClientActionArgs) {
  const loggedIn = useAuthStore.getState().loadAuth();
  return loggedIn ? redirect("/catalog") : redirect("/auth");
}

export default function Home() {
  return <></>;
}
