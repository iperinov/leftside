import { createClient } from "~/api/ocs/client/client";
import { defaultAppConfig } from "~/config/appConfig";

export const ocsClient = createClient({
  baseUrl: defaultAppConfig.ocs.baseUrl,
  /*headers: {
      Authorization: 'Bearer <token_from_local_client>',
    },*/
});
