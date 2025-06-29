import { Button, Flex } from "@radix-ui/themes";
import type ClassNameProps from "../shared/ClassNameProps";

interface ConfigurationHeaderProps {
    onCanceled?: () => void;
    onCompleted?: () => void;
}

export default function ConfigurationHeader({onCanceled, onCompleted, className}: ConfigurationHeaderProps & ClassNameProps) {
    return (
        <Flex align="end" className={className} >
            <Button onClick={onCanceled}>Cancel</Button>
            <Button onClick={onCompleted}>Save changes</Button>
        </Flex>
    )
}