import { Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import LoginForm from "~/components/LoginForm";
import { useAuthStore, type AuthData } from "~/stores/useAuthStore";

export default function AuthPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = (auth: AuthData) => {
    useAuthStore.getState().login(auth);
    navigate("/catalog");
  };

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
      <LoginForm onSuccess={handleLoginSuccess} onFail={() => navigate("/login")} /> 
    </Flex>
  );
}
