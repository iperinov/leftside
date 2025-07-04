import { getAppConfig } from "~/lib/runtimeConfig";
import type { Category } from "../configurations/config.types";
import { mockConfigurationCategories } from "./mock/mockCategories";

const scsUrl = getAppConfig().scs.baseUrl;

export const getConfigurationCategories = async (configID: string): Promise<Category[]> => {
  const url = new URL(`${scsUrl}/config/${configID}`);
  // TODO:

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockConfigurationCategories;
};
