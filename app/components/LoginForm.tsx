import { Box, Button, Flex, Heading, Separator, Text, TextField } from "@radix-ui/themes";
import { useRef } from "react";
import useLogin from "~/hooks/auth/useLogin";
import type { AuthData } from "~/stores/useAuthStore";

interface LoginFormProps {
  onSuccess?: (auth: AuthData) => void;
  onFail?: (error: Error) => void;
}

export default function LoginForm({ onSuccess, onFail }: LoginFormProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const login = useLogin({
    onSuccess: (response, request) => {
      console.log("Login success: ", response, request);
      onSuccess?.({ email: request.username });
    },
    onError: (error) => {
      console.error("Login failed:", error);
      onFail?.(error);
    },
  });

  const handleLogin = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    console.log("login attempt from user: ", username, ", pass: ", password);

    if (username && password) {
      login.mutate({ body: { username, password } });
    }
  };

  return (
    <Box
      p="4"
      width="400px"
      style={{
        backgroundColor: "var(--accent-1)",
        borderRadius: "var(--radius-3)",
        boxShadow: "var(--shadow-4)",
      }}
    >
      <Heading size="5">Login</Heading>
      <Separator orientation="horizontal" size="4" mt="1" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <Flex direction="column" gap="1" py="2">
          <Text size="2">Username</Text>
          <TextField.Root ref={usernameRef} name="username" defaultValue="iperinov@dev.priv" required placeholder="Username" autoComplete="username" />
          <Text size="2">Password</Text>
          <TextField.Root
            ref={passwordRef}
            name="password"
            defaultValue="Informatika221005"
            type="password"
            required
            placeholder="Password"
            autoComplete="current-password"
          />
          <Flex justify="end" align="center" pt="1">
            <Button id="login" type="submit" loading={login.isPending} variant="outline">
              Log In
            </Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
}
