import { Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import LoginForm from "~/components/LoginForm";
import { type AuthData, useAuthStore } from "~/stores/useAuthStore";

export default function AuthPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = (auth: AuthData) => {
    useAuthStore.getState().login(auth);
    toast.success("Login successful");
    navigate("/catalog");
  };

  const handleLoginFail = (error: Error) => {
    toast.error(error.message);
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
      <LoginForm onSuccess={handleLoginSuccess} onFail={handleLoginFail} />
    </Flex>
  );
}
