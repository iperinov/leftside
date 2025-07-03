import {
  Box,
  Button,
  Flex,
  Heading,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Form, useNavigation } from "react-router";

export default function LoginForm() {
  const navigation = useNavigation();
  const isLogging = navigation.state === "submitting";

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
      <Form method="post">
        <Flex direction="column" gap="1" py="2">
          <Text size="2">Email address</Text>
          <TextField.Root
            name="email"
            type="email"
            required
            placeholder="Email"
            autoComplete="email"
          />
          <Text size="2">Password</Text>
          <TextField.Root
            name="password"
            type="password"
            required
            placeholder="Password"
            autoComplete="current-password"
          />
          <Flex justify="end" align="center" pt="1">
            <Button
              id="login"
              type="submit"
              disabled={isLogging}
              variant="outline"
            >
              {isLogging ? "Loggin in..." : "Log In"}
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Box>
  );
}
