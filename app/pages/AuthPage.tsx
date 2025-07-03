import { Flex } from "@radix-ui/themes";
import LoginForm from "~/components/LoginForm";

export default function AuthPage() {
  return (
    <Flex
      id="main"
      height="100vh"
      align="center"
      justify="center"
      style={{
        backgroundColor: "var(--accent-2)",
      }}
    >
      <LoginForm />
    </Flex>
  );
}
