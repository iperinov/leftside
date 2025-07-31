import { Button, HoverCard, Text } from "@radix-ui/themes";
import type ClassNameProps from "../shared/ClassNameProps";
import type MouseClickProps from "../shared/MouseClickProps";
import "~/styles/awesome/sportsKit/css/custom-icons.min.css";
import "~/styles/awesome/sportsKit/css/all.min.css";
import { sportIconsConfig } from "~/lib/sportIconsConfig";
interface SportAwesomeIconProps {
  sportIcon: string;
  selected?: boolean;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  hint?: string;
}

export default function SportAwesomeIcon({
  sportIcon,
  selected = false,
  size,
  className,
  hint,
  onClick,
}: SportAwesomeIconProps & ClassNameProps & MouseClickProps) {
  return (
    <HoverCard.Root openDelay={700} closeDelay={100}>
      <HoverCard.Trigger>
        <Button variant="ghost" onClick={onClick} className={"nohover noselect"}>
          <i
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            className={`${awesomeIconClassStyles(size || 1)} fa-${sportIcon} ${className}`}
            data-selected={selected ? "true" : undefined}
          />
        </Button>
      </HoverCard.Trigger>
      <HoverCard.Content maxWidth="300px" hideWhenDetached={true}>
        <Text wrap="pretty">{hint || sportIcon}</Text>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}

interface DefaultAwesomeIconProps {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export function DefaultSportAwesomeIcon({ size, className, onClick }: DefaultAwesomeIconProps & ClassNameProps & MouseClickProps) {
  return (
    <Button variant="ghost" onClick={onClick} className={"nohover noselect"}>
      <i className={`${awesomeIconClassStyles(size || 1)} fa-${sportIconsConfig?.genericIconName} ${className}`} />
    </Button>
  );
}

export function awesomeIconClassStyles(size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10) {
  return `fa-kit fa-${size}x`;
}
