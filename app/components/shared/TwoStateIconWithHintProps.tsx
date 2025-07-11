import { HoverCard, IconButton, Text } from "@radix-ui/themes";

interface TwoStateIconWithHintProps {
  selected: boolean;
  hint: string;
  onSelected?: () => void;
  onDeselected?: () => void;
  SelectedIcon: React.ComponentType<{ color?: string; onClick?: () => void }>;
  NotSelectedIcon: React.ComponentType<{ color?: string; onClick?: () => void }>;
}

export default function TwoStateIconWithHint({
  selected = false,
  hint,
  onSelected,
  onDeselected,
  SelectedIcon,
  NotSelectedIcon,
}: TwoStateIconWithHintProps) {

  const onClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    selected ? onDeselected?.() : onSelected?.();
  }

  return (
    <HoverCard.Root openDelay={700} closeDelay={100}>
      <HoverCard.Trigger>
        <IconButton variant="ghost" onClick={onClick} className="nohover">
          {selected ? <SelectedIcon  /> : <NotSelectedIcon />}
        </IconButton>
      </HoverCard.Trigger>
      <HoverCard.Content maxWidth="300px" hideWhenDetached={true}>
        <Text wrap="pretty">{hint}</Text>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
