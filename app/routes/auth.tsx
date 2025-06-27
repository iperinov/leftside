import { redirect } from "react-router";
import { auth } from "~/api/auth/useAuth";
import { useAuthStore } from "~/stores/useAuthStore";
import AuthPage from "../pages/AuthPage";
import type { Route } from "./+types/auth";

export function meta() {
  return [{ title: "Schedule Admin - Login" }];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const resp = await auth({ email, password });

  useAuthStore.getState().setAuth(resp);

  return redirect("/catalog");
}

export default function Auth() {
  return <AuthPage />;
}
