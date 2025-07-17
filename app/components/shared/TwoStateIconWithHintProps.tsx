import { Flex, HoverCard, IconButton, Text } from "@radix-ui/themes";

interface TwoStateIconWithHintProps {
  selected: boolean;
  hint: { title: string; desc: string };
  onSelected?: () => void;
  onDeselected?: () => void;
  SelectedIcon: React.ComponentType<{ color?: string; onClick?: () => void }>;
  NotSelectedIcon: React.ComponentType<{ color?: string; onClick?: () => void }>;
}

export default function TwoStateIconWithHint({ selected = false, hint, onSelected, onDeselected, SelectedIcon, NotSelectedIcon }: TwoStateIconWithHintProps) {
  const onClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    selected ? onDeselected?.() : onSelected?.();
  };

  return (
    <HoverCard.Root openDelay={700} closeDelay={100}>
      <HoverCard.Trigger>
        <IconButton variant="ghost" onClick={onClick} className="nohover">
          {selected ? <SelectedIcon /> : <NotSelectedIcon />}
        </IconButton>
      </HoverCard.Trigger>
      <HoverCard.Content maxWidth="300px" hideWhenDetached={true}>
        <Flex direction="column" gap="3">
          <Text weight="bold" wrap="pretty">
            {hint.title}
          </Text>
          <Text wrap="pretty">{hint.desc}</Text>
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
