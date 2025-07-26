import type { CreateClientConfig } from "~/api/sccs/client.gen";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  credentials: "include", // sends cookies automatically
});
