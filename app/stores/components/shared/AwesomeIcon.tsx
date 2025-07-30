import { isClassAvailable } from "~/utils/isClassAvailable";
import type ClassNameProps from "./ClassNameProps";
import "~/styles/awesome/commonKit/css/all.min.css";

interface AwesomeIconProps {
  iconClass: string;
  selected?: boolean;
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
}

export default function AwesomeIcon({ iconClass, selected = false, size, className }: AwesomeIconProps & ClassNameProps) {
  return (
    <i
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      className={`${getAwesomeIconClass(`fa-${iconClass}`, size || "1")} ${className}`}
      data-selected={selected ? "true" : undefined}
    />
  );
}

function awesomeIconClassStyles(size: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10") {
  return `fa-regular fa-${size}x`;
}

function getAwesomeIconClass(iconClass: string, size: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"): string | undefined {
  const iconStyleClass = `${awesomeIconClassStyles(size)} ${iconClass}`;
  return isClassAvailable(iconStyleClass) ? iconStyleClass : undefined;
}
