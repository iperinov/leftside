import { Flex } from "@radix-ui/themes";
import type ClassNameProps from "../shared/ClassNameProps";
import FiltersGroupRow from "./filters/FilterGroupRow";

interface ConfigurationContentMainProps {
}

export default function ConfigurationContentMain({className}: ConfigurationContentMainProps & ClassNameProps) {
  return (
    <Flex direction="column" p="2" flexGrow="1">
        <FiltersGroupRow categoryID={"1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p9"} filterGroupID={"1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p8"}  />
    </Flex>
  );
    
}