import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import type ClassNameProps from "../../shared/ClassNameProps";
import styles from "./Filters.module.css";

interface FilterProps {
  label: string;
  values?: string[];
  disabled?: boolean;
  onClick?: () => void;
}

export default function Filter({ label, values, disabled = false, onClick, className }: FilterProps & ClassNameProps) {
  const hasValues = values && values.length > 0;
  const valuesText = values?.join(", ") || "";
  const text = hasValues ? `${label}: ${valuesText}` : label;

  return (
    <Flex 
      gap="1" 
      align="center" 
      data-no-values={hasValues ? undefined : "true"} 
      data-disabled={disabled ? "true" : undefined} 
      className={`${styles.filter} ${className}`}
    >
      <Text as="label" htmlFor={label}>{text}</Text>
      <Button id={label} variant="ghost" className="nohover" onClick={onClick}>
          {hasValues ? <Pencil1Icon /> : <PlusIcon />}
      </Button>
      
    </Flex>
  );
}
