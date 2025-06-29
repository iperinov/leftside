import { Flex, Text } from "@radix-ui/themes";
import type ClassNameProps from "../shared/ClassNameProps";

interface ConfigurationHeaderProps {
    edit: boolean;
    name: string;
}

export default function ConfigurationHeader({edit, name, className}: ConfigurationHeaderProps & ClassNameProps) {
    return (
        <Flex align={"center"} className={className} >
            <Text>
                {edit ? `Edit: ${name}` : `Create: ${name}`}
            </Text>
        </Flex>
    )
}