import { type AppConfig, defaultAppConfig } from "../config/appConfig";

let runtimeOverrides: Partial<AppConfig> = {};

export async function loadRuntimeConfig(): Promise<void> {
  try {
    const res = await fetch("/config.json");
    if (!res.ok) throw new Error("Failed to fetch config.json");
    const data = await res.json();
    runtimeOverrides = data;
    console.log("loadRuntimeConfig runtimeOverrides: ", runtimeOverrides, defaultAppConfig);
  } catch (err) {
    console.warn("[config] Falling back to default config:", err);
  }
}

//TODO: check why the override is working on debug and not working with npm run dev
export function getAppConfig(): AppConfig {
  return {
    ...defaultAppConfig,
    ...runtimeOverrides,
    sccs: {
      ...defaultAppConfig.sccs,
      ...runtimeOverrides.sccs,
    },
    features: {
      ...defaultAppConfig.features,
      ...runtimeOverrides.features,
    },
    ui: {
      ...defaultAppConfig.ui,
      ...runtimeOverrides.ui,
    },
    metadata: {
      ...defaultAppConfig.metadata,
      ...runtimeOverrides.metadata,
    },
  };
}
