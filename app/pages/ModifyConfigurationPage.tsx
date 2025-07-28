import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { BookRev } from "~/api/sccs/types.gen";
import ConfigurationContent from "~/components/categories/ConfigurationContent";
import ConfigurationFooter from "~/components/categories/ConfigurationFooter";
import ConfigurationHeader from "~/components/categories/ConfigurationHeader";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import { useInitConfigStore } from "~/hooks/categories/useInitConfigStore";
import { useAssignConfig } from "~/hooks/configuraitons/useAssignConfig";
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
  const assignedBooks = useCategoryTreeStore((state) => state.assignedBooks);
  const email = useAuthStore((state) => state.auth?.email);
  const updateConfig = useUpdateConfiguration({
    configUUID: uuid,
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
  const assignConfig = useAssignConfig({
    configUUID: uuid,
    onSuccess: (response) => {
      toast.success("Configuration assigned successfully");
    },
    onError: (error) => {
      toast.error("Failed to assign configuration");
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
        rev: configuration.rev,
        name: configuration.name,
        categories: rootCategory.children || [],
      },
    });
    assignConfig.mutate({
      path: { uuid: selectedUUID },
      body: assignedBooks.map(
        (book) =>
          ({
            id: book.id,
            rev: book.rev,
          }) as BookRev,
      ),
    });
  };

  return (
    <LoadDataDecorator error={error} isLoading={isLoading || updateConfig.isPending || assignConfig.isPending}>
      <Flex direction="column" className={styles.page}>
        <ConfigurationHeader edit={edit} className={styles.header} />
        <ConfigurationContent selectedUUID={selectedUUID} setSelectedID={setSelectedUUID} className={styles.content} />
        <ConfigurationFooter onCancel={onCancel} onSave={onSave} className={styles.footer} isProcessing={updateConfig.isPending} />
      </Flex>
    </LoadDataDecorator>
  );
}
