import { Outlet } from "react-router";
import { redirect } from "react-router";
import Header from "~/components/Header";
import { useAuthStore } from "../stores/useAuthStore";

export async function clientLoader() {
  const loggedIn = useAuthStore.getState().loadAuth();

  if (!loggedIn) {
    return redirect("/auth");
  }

  return null;
}

export default function MainLayout() {
  return (
    <>
      <div className="flex flex-col h-screen overflow-y-auto">
        <Header />
        <Outlet />
      </div>
    </>
  );
}
