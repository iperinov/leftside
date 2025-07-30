import { SportIconsConfig } from "~/lib/sportIconsConfig";

export async function getSportIconsConfig(): Promise<SportIconsConfig> {
  return await fetch("/sportIconsConfig.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch config.json");
      return response.json();
    })
    .then((data) => {
      return new SportIconsConfig(data);
    })
    .catch((error) => {
      console.error("Error fetching sport icons config:", error);
      return new SportIconsConfig([]);
    });
}
