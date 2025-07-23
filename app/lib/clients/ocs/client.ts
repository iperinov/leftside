import { createClient } from "~/api/ocs/client/client";
import { defaultAppConfig } from "~/config/appConfig";

export const client = createClient({
  baseUrl: defaultAppConfig.ocs.baseUrl,
});
