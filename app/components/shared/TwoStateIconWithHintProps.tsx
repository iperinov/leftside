import { HoverCard, Text } from "@radix-ui/themes";

interface TwoStateIconWithHintProps {
  selected: boolean;
  hint: string;
  onSelected?: () => void;
  onDeselected?: () => void;
  color?: string;
  SelectedIcon: React.ComponentType<{ color?: string; onClick?: () => void }>;
  NotSelectedIcon: React.ComponentType<{ color?: string; onClick?: () => void }>;
}

export default function TwoStateIconWithHint({
  selected = false,
  hint,
  onSelected,
  onDeselected,
  color,
  SelectedIcon,
  NotSelectedIcon,
}: TwoStateIconWithHintProps) {
  return (
    <HoverCard.Root openDelay={700} closeDelay={100}>
      <HoverCard.Trigger>
        {selected ? <SelectedIcon color={color} onClick={onDeselected} /> : <NotSelectedIcon color={color} onClick={onSelected} />}
      </HoverCard.Trigger>
      <HoverCard.Content maxWidth="300px" hideWhenDetached={true}>
        <Text wrap="pretty">{hint}</Text>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
