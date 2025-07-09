import { useLocation, useParams } from "react-router-dom";
import ModifyConfigurationPage from "~/pages/ModifyConfigurationPage";

export default function Configuration() {
  const { uuid } = useParams();
  if (!uuid) {
    throw new Error("Missing configuration ID in route params");
  }
  const location = useLocation();
  const { name, edit } = location.state || {};
  return <ModifyConfigurationPage uuid={uuid} name={name} edit={edit} />;
}
