export interface AppConfig {
  scs: {
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
  scs: {
    baseUrl: import.meta.env.VITE_SCS_BASE_URL || "http://localhost:3000",
    timeout: 10000,
  },
  ocs: {
    baseUrl: import.meta.env.VITE_SCS_BASE_URL || "http://localhost:4000",
    timeout: 10000,
  },
  ssm: {
    baseUrl: import.meta.env.VITE_SCS_BASE_URL || "http://localhost:5000",
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
