import { Flex } from "@radix-ui/themes";
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
      {/* Use minHeight: '100dvh' (viewport height with dynamic safe area) */}
      <Flex direction="column" style={{ minHeight: "100dvh" }}>
        <Header />
        <Outlet />
      </Flex>
    </>
  );
}
