import { Flex } from "@radix-ui/themes";
import { Outlet } from "react-router";
import { redirect } from "react-router";
import Header from "~/components/Header";
import { useAuthStore } from "../stores/useAuthStore";

export async function clientLoader() {
  if (!useAuthStore.getState().isLoggedIn()) {
    return redirect("/auth");
  }

  return null;
}

export default function MainLayout() {
  return (
    <>
      <Flex direction="column" style={{ height: "100vh" }}>
        <Header />
        <Outlet />
      </Flex>
    </>
  );
}
