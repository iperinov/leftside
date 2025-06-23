import { Outlet, redirect } from "react-router";
import { useAuthStore } from "~/stores/useAuthStore";

export async function clientLoader() {
  const loggedIn = useAuthStore.getState().loadAuth();

  if (loggedIn) {
    return redirect("/");
  }

  return null;
}

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Outlet />
    </div>
  );
}
