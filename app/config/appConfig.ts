export interface AppConfig {
  sccs: {
    baseUrl: string;
    timeout: number;
  };
  ocs: {
    baseUrl: string;
    timeout: number;
  };
  ssm: {
    baseUrl: string;
    timeout: number;
  };
  cdb: {
    baseUrl: string;
    timeout: number;
    auth?: {
      username: string;
      password: string;
    };
  };
  features: {
    enableRename: boolean;
    enableDuplicate: boolean;
    showDebugTools: boolean;
  };
  ui: {
    theme: "light" | "dark";
    toastDuration: number;
    defaultLanguage: string;
    localeString: string;
    timeZone: string;
  };
  metadata: {
    appName: string;
    version: string;
  };
}

export const defaultAppConfig: AppConfig = {
  sccs: {
    baseUrl: import.meta.env.VITE_SCS_BASE_URL || "http://sccs-integ.im.priv/",
    timeout: 10000,
  },
  ocs: {
    baseUrl: import.meta.env.VITE_OCS_BASE_URL || "http://integ-fbsd-apps.im.priv:8080",
    timeout: 10000,
  },
  ssm: {
    baseUrl: import.meta.env.VITE_SSM_BASE_URL || "http://localhost:5000",
    timeout: 10000,
  },
  cdb: {
    baseUrl: import.meta.env.VITE_CDB_BASE_URL || "http://couchdb-integ.im.priv",
    timeout: 10000,
  },
  features: {
    enableRename: true,
    enableDuplicate: true,
    showDebugTools: import.meta.env.DEV,
  },
  ui: {
    theme: "light",
    toastDuration: 3000,
    defaultLanguage: "en",
    localeString: "en-US",
    timeZone: "America/Los_Angeles",
  },
  metadata: {
    appName: "Schedule Configurations UI",
    version: "0.0.0",
  },
};
