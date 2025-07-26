import { createClient } from "~/api/ocs/client/client";
import { defaultAppConfig } from "~/config/appConfig";
import { createClientConfig } from "./customFetch";

export const client = createClient(
  createClientConfig({
    baseUrl: defaultAppConfig.ocs.baseUrl,
  }),
);
