import { Flex, Text, TextField } from "@radix-ui/themes";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type ClassNameProps from "../shared/ClassNameProps";

interface ConfigurationHeaderProps {
  edit: boolean;
}

export default function ConfigurationHeader({ edit, className }: ConfigurationHeaderProps & ClassNameProps) {
  const configurationName = useCategoryTreeStore((state) => state.configuration.name);
  const updateConfigurationName = useCategoryTreeStore((state) => state.updateConfigurationName);
  return (
    <Flex align={"center"} gap="2" className={className}>
      <Text>{edit ? "Edit:" : "Create:"}</Text>
      <TextField.Root style={{ width: "300px" }} value={configurationName} onChange={(e) => updateConfigurationName(e.target.value)} />
    </Flex>
  );
}
