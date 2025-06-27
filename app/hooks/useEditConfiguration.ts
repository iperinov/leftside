import { useState } from "react";
import type { Configuration } from "../api/scs/configurations/getConfigurations";
import { updateConfiguration } from "../api/scs/configurations/updateConfiguration";
import { useConfigStore } from "../stores/configStore";

export const useEditConfiguration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const editConfiguration = useConfigStore((state) => state.editConfiguration);
  const configurations = useConfigStore((state) => state.configurations);

  const update = async (uuid: string, updates: Partial<Configuration>) => {
    const existing = configurations.find((c) => c.uuid === uuid);
    if (!existing) throw new Error("Configuration not found");

    //Create a new object based on existing, and override any fields with values from updates.
    const toUpdate: Configuration = {
      ...existing,
      ...updates,
    };

    setIsLoading(true);
    try {
      const result = await updateConfiguration(toUpdate);
      // editConfiguration(result);
    } catch (err) {
      console.error("Failed to update configuration", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { update, isLoading };
};
