import { Outlet } from "react-router";
import { redirect } from "react-router";
import Header from "~/components/Header";
import { useAuthStore } from "../stores/useAuthStore";
import { Flex } from "@radix-ui/themes";

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
      <Flex direction="column" overflow-y="auto" height="100vh">
        <Header />
        <Outlet />
      </Flex>
    </>
  );
}
