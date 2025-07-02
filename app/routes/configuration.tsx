import { useLocation, useParams } from "react-router-dom";
import ModifyConfigurationPage from "~/pages/ModifyConfigurationPage";

export default function Configuration() {
  const { id } = useParams();
  if (!id) {
    throw new Error("Missing configuration ID in route params");
  }
  const location = useLocation();
  const { name, edit } = location.state || {};
  return <ModifyConfigurationPage id={id} name={name} edit={edit} />;
}
