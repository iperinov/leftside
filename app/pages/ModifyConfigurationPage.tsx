import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ConfigurationContent from "~/components/categories/ConfigurationContent";
import ConfigurationFooter from "~/components/categories/ConfigurationFooter";
import ConfigurationHeader from "~/components/categories/ConfigurationHeader";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import { useCategories } from "~/hooks/configurationCategories/useCategories";
import styles from "./ModifyConfigurationPage.module.css";

interface ModifyConfigurationPageProps {
  id?: string;
  name?: string;
  edit?: boolean;
}

export default function ModifyConfigurationPage({ id = "", name = "", edit = false }: ModifyConfigurationPageProps) {
  const { error, isLoading } = useCategories(id);
  const [selectedID, setSelectedID] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const onCanceled = () => {
    if (!isProcessing) navigate("/configurations/");
  };

  const onCompleted = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success(`Configuration "${name}" saved successfully.`);
    navigate("/configurations/");
  };

  return (
    <LoadDataDecorator error={error} isLoading={isLoading}>
      <Flex direction="column" className={styles.page}>
        <ConfigurationHeader name={name} edit={edit} className={styles.header} />
        <ConfigurationContent selectedID={selectedID} setSelectedID={setSelectedID} className={styles.content} />
        <ConfigurationFooter onCanceled={onCanceled} onCompleted={onCompleted} className={styles.footer} isProcessing={isProcessing} />
      </Flex>
    </LoadDataDecorator>
  );
}
