import { useQuery } from "@tanstack/react-query";
import type { Configuration } from "~/api/cdb/cdb.types";
import getAllConfigurationsBooks from "~/api/cdb/getAllConfiguraitonsBooks";
import getConfigurations from "~/api/cdb/getAllConfigurations";
import { queryKeys } from "../../lib/queryKeys";

export const useConfigurations = () => {
  const {
    data: configs,
    isLoading: isConfigsLoading,
    error: errorConfigs,
  } = useQuery({
    queryKey: queryKeys.configurations(),
    queryFn: getConfigurations,
  });

  const {
    data: books,
    isLoading: isLoadingBooks,
    error: errorBooks,
  } = useQuery({
    queryKey: queryKeys.configurationsBooks(),
    queryFn: getAllConfigurationsBooks,
  });
  const data: Configuration[] | undefined =
    configs && books
      ? configs.map(
          (config) =>
            ({
              uuid: config.uuid,
              name: config.name,
              lmt: config.lmt,
              lmu: config.lmu,
              _rev: config._rev,
              books: books.find((b) => b.configID === config.uuid)?.books || [],
            }) as Configuration,
        )
      : undefined;

  return { data, isLoading: isConfigsLoading || isLoadingBooks, error: errorConfigs || errorBooks };
};
