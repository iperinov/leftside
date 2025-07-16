import { sportInfo } from "~/api/general/sport-info-uuid.service";
import { isClassAvailable } from "~/utils/isClassAvailable";
import type ClassNameProps from "../shared/ClassNameProps";
import type MouseClickProps from "../shared/MouseClickProps";

interface AwesomeIconProps {
  sportUUID: string;
  fallbackAwesomeIconClass?: string;
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
}

export default function AwesomeIcon({ sportUUID, fallbackAwesomeIconClass, size, className, onClick }: AwesomeIconProps & ClassNameProps & MouseClickProps) {
  return (
    <i
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.(e);
      }}
      role="button"
      tabIndex={0}
      aria-label="Icon action"
      className={`${getAwesomeIconClassForSport(sportUUID, size || "1") || getAwesomeIconClass(fallbackAwesomeIconClass || "fa-image", size || "1")} ${className}`}
    />
  );
}

interface DefaultAwesomeIconProps {
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
}

export function DefaultAwesomeIcon({ size, className, onClick }: DefaultAwesomeIconProps & ClassNameProps & MouseClickProps) {
  return (
    <i
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.(e);
      }}
      role="button"
      tabIndex={0}
      aria-label="Icon action"
      className={`${awesomeIconClassStyles(size || "1")} fa-image ${className}`}
    />
  );
}

export function awesomeIconClassStyles(size: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10") {
  return `fa-solid fa-${size}x`;
}

export function getAwesomeIconClass(iconClass: string, size: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"): string | undefined {
  const iconStyleClass = `${awesomeIconClassStyles(size)} ${iconClass}`;
  return isClassAvailable(iconStyleClass) ? iconStyleClass : undefined;
}

export function getAwesomeIconClassForSport(sportUUID: string, size: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"): string | undefined {
  return getAwesomeIconClass(`fa-${sportInfo.getShortDescription(sportUUID)}`, size);
}
