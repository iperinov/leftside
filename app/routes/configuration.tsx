import ModifyConfigurationPage from "~/pages/ModifyConfigurationPage";
import type { Route } from "./+types/configuration";


export function meta() {
    return [{title: `${name} configuration`}]
}

export default function Configuration({ params }: Route.ComponentProps) {
  const { id } = params;
  return (
    <ModifyConfigurationPage/ >
  )
}
