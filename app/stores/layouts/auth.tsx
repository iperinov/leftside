import { Outlet, redirect } from "react-router";
import { useAuthStore } from "~/stores/useAuthStore";

export async function clientLoader() {
  if (useAuthStore.getState().isLoggedIn()) {
    return redirect("/");
  }

  return null;
}

export default function AuthLayout() {
  return <Outlet />;
}
