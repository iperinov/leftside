import { Button } from "@radix-ui/themes";
import type ClassNameProps from "../shared/ClassNameProps";
import type MouseClickProps from "../shared/MouseClickProps";
import "~/styles/awesome/sportsKit/css/custom-icons.min.css";
import "~/styles/awesome/sportsKit/css/all.min.css";
interface SportAwesomeIconProps {
  sportIcon: string;
  selected?: boolean;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export default function SportAwesomeIcon({
  sportIcon,
  selected = false,
  size,
  className,
  onClick,
}: SportAwesomeIconProps & ClassNameProps & MouseClickProps) {
  return (
    <Button variant="ghost" onClick={onClick} className={"nohover noselect"}>
      <i
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        className={`${awesomeIconClassStyles(size || 1)} fa-${sportIcon} ${className}`}
        data-selected={selected ? "true" : undefined}
      />
    </Button>
  );
}

interface DefaultAwesomeIconProps {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export function DefaultSportAwesomeIcon({ size, className, onClick }: DefaultAwesomeIconProps & ClassNameProps & MouseClickProps) {
  return (
    <Button variant="ghost" onClick={onClick} className={"nohover noselect"}>
      <i className={`${awesomeIconClassStyles(size || 1)} fa-sportgeneric ${className}`} />
    </Button>
  );
}

export function awesomeIconClassStyles(size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10) {
  return `fa-kit fa-${size}x`;
}
