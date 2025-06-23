import type { AuthData } from "../../stores/useAuthStore";

type AuthRequest = {
  email: string;
  password: string;
};

export const auth = async (data: AuthRequest): Promise<AuthData> => {
  //Simulate something loading..
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log(`Email: ${data.email}`);

  return {
    token: "mocked-token-123",
    email: data.email,
  };
};
