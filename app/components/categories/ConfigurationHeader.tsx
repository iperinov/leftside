import { Flex, Text } from "@radix-ui/themes";
import type ClassNameProps from "../shared/ClassNameProps";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";

interface ConfigurationHeaderProps {
  edit: boolean;
  name: string;
}

export default function ConfigurationHeader({ edit, className }: ConfigurationHeaderProps & ClassNameProps) {
  const configurationName = useCategoryTreeStore((state) => state.configuration.name);
  
  return (
    <Flex align={"center"} className={className}>
      <Text>{edit ? `Edit: ${configurationName}` : `Create: ${configurationName}`}</Text>
    </Flex>
  );
}
