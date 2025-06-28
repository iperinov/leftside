import { getAppConfig } from "~/lib/runtimeConfig";
import type { Category } from "../configurations/config.types";
import { mockConfigurationCategories } from "./mock/mockCategories";

const scsUrl = getAppConfig().scs.baseUrl;

export const getConfigurationCategories = async (configurationUUID: string): Promise<Category[]> => {
  const url = new URL(`${scsUrl}/config/${configurationUUID}`);
  console.log("get config categories: ", url);
  // TODO:

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockConfigurationCategories;
};
