import { Box, Button, Flex, Heading, Separator, Text, TextField } from "@radix-ui/themes";
import { useRef } from "react";
import useLogin from "~/hooks/auth/useLogin";
import type { AuthData } from "~/stores/useAuthStore";

interface LoginFormProps {
  onSuccess?: (auth: AuthData) => void;
  onFail?: () => void;
}

export default function LoginForm({ onSuccess, onFail }: LoginFormProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const login = useLogin({
    onSuccess: (data) => {
      const email = emailRef.current?.value;
      if (!email) throw new Error("Successful login without email!");
      onSuccess?.({email});
    },
    onError: (error) => {
      console.error("Login failed:", error);
      onFail?.();
    },
  });
  
  const handleLogin = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      login.mutate({ body: { username: email, password } });
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
      <form onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}>
        <Flex direction="column" gap="1" py="2">
          <Text size="2">Email address</Text>
          <TextField.Root ref={emailRef} name="email" type="email" required placeholder="Email" autoComplete="email" />
          <Text size="2">Password</Text>
          <TextField.Root ref={passwordRef} name="password" type="password" required placeholder="Password" autoComplete="current-password" />
          <Flex justify="end" align="center" pt="1">
            <Button id="login" type="submit" loading={login.isPending} variant="outline">Log In</Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
}
