import { useQuery } from "@tanstack/react-query";
import fetchConfigSummaries from "~/api/configs/listConfigSummaries";

export default function useConfiguration() {
  return useQuery({
    queryKey: ["listConfigs"],
    queryFn: fetchConfigSummaries,
  });
}