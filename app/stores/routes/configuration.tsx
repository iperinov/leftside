import { useLocation, useParams } from "react-router-dom";
import { loadSportIconsConfig } from "~/lib/sportIconsConfig";
import ModifyConfigurationPage from "~/pages/ModifyConfigurationPage";
import type { Route } from "./+types/configuration";

export async function clientLoader(_args: Route.ClientActionArgs) {
  await loadSportIconsConfig();
}

export default function Configuration() {
  const { uuid } = useParams();
  if (!uuid) {
    throw new Error("Missing configuration ID in route params");
  }
  const location = useLocation();
  const { name, edit } = location.state || {};
  return <ModifyConfigurationPage uuid={uuid} edit={edit} />;
}
