import type { CreateClientConfig } from "~/api/ocs/client.gen";


export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  credentials: 'include', // sends cookies automatically
});