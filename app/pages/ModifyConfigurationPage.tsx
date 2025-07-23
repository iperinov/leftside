import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ConfigurationContent from "~/components/categories/ConfigurationContent";
import ConfigurationFooter from "~/components/categories/ConfigurationFooter";
import ConfigurationHeader from "~/components/categories/ConfigurationHeader";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import { useInitConfigStore } from "~/hooks/categories/useInitConfigStore";
import { useUpdateConfiguration } from "~/hooks/configuraitons/useUpdateConfiguration";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import { useAuthStore } from "~/stores/useAuthStore";
import styles from "./ModifyConfigurationPage.module.css";

interface ModifyConfigurationPageProps {
  uuid?: string;
  edit?: boolean;
}

export default function ModifyConfigurationPage({ uuid = "", edit = false }: ModifyConfigurationPageProps) {
  const { error, isLoading } = useInitConfigStore(uuid);
  const [selectedUUID, setSelectedUUID] = useState<string>("");
  const navigate = useNavigate();
  const configuration = useCategoryTreeStore((state) => state.configuration);
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);
  const email = useAuthStore((state) => state.auth?.email);
  const updateConfig = useUpdateConfiguration({
    onSuccess: (response) => {
      toast.success("Configuration updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update configuration");
      console.error(error);
    },
    onSettled: () => {
      navigate("/configurations/");
    },
  });

  if (!email) throw new Error("Not logged in user is trying to modify configuration");

  const onCancel = () => {
    navigate("/configurations/");
  };

  const onSave = async () => {
    updateConfig.mutate({
      path: { uuid: selectedUUID },
      body: {
        uuid: uuid,
        _rev: configuration._rev,
        name: configuration.name,
        categories: rootCategory.children || [],
        lmt: Date.now(),
        lmu: email,
      },
    });
  };

  return (
    <LoadDataDecorator error={error} isLoading={isLoading || updateConfig.isPending}>
      <Flex direction="column" className={styles.page}>
        <ConfigurationHeader edit={edit} className={styles.header} />
        <ConfigurationContent selectedUUID={selectedUUID} setSelectedID={setSelectedUUID} className={styles.content} />
        <ConfigurationFooter onCancel={onCancel} onSave={onSave} className={styles.footer} isProcessing={updateConfig.isPending} />
      </Flex>
    </LoadDataDecorator>
  );
}
