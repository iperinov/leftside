import { Button } from "@radix-ui/themes";
import { sportInfo } from "~/api/general/sport-info-uuid.service";
import { isClassAvailable } from "~/utils/isClassAvailable";
import type ClassNameProps from "../shared/ClassNameProps";
import type MouseClickProps from "../shared/MouseClickProps";
import "~/styles/awesome/sportKit/css/custom-icons.min.css";
import "~/styles/awesome/sportKit/css/all.min.css";

interface SportAwesomeIconProps {
  sportUUID: string;
  selected?: boolean;
  fallbackAwesomeIconClass?: string;
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
}

export default function SportAwesomeIcon({
  sportUUID,
  selected = false,
  fallbackAwesomeIconClass,
  size,
  className,
  onClick,
}: SportAwesomeIconProps & ClassNameProps & MouseClickProps) {
  return (
    <Button variant="ghost" onClick={onClick} className={"nohover noselect"}>
      <i
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        className={`${
          getAwesomeIconClassForSport(sportUUID, size || "1") ||
          getAwesomeIconClass(fallbackAwesomeIconClass || "fa-kit fa-sportgeneric", size || "1") ||
          getAwesomeIconClass("fa-kit fa-sportgeneric", size || "1")
        } ${className}`}
        data-selected={selected ? "true" : undefined}
      />
    </Button>
  );
}

interface DefaultAwesomeIconProps {
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
}

export function DefaultSportAwesomeIcon({ size, className, onClick }: DefaultAwesomeIconProps & ClassNameProps & MouseClickProps) {
  return (
    <Button variant="ghost" onClick={onClick} className={"nohover noselect"}>
      <i className={`${awesomeIconClassStyles(size || "1")} fa-sportgeneric ${className}`} />
    </Button>
  );
}

export function awesomeIconClassStyles(size: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10") {
  return `fa-kit fa-${size}x`;
}

function getAwesomeIconClass(iconClass: string, size: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"): string | undefined {
  const iconStyleClass = `${awesomeIconClassStyles(size)} ${iconClass}`;
  return isClassAvailable(iconStyleClass) ? iconStyleClass : undefined;
}

export function getAwesomeIconClassForSport(sportUUID: string, size: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"): string | undefined {
  return getAwesomeIconClass(`fa-${sportInfo.getShortDescription(sportUUID)}`, size);
}
