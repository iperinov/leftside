import { Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import type { RenameLeagueApiIn } from "~/api/ocs/ocs.types";
import { BaseDialog } from "~/components/shared/BaseDialog";

interface RenameLeagueProps {
  league: RenameLeagueApiIn;
  onClose: () => void;
  onRename: (newName: string) => void;
}

export function RenameLeagueDialog({ league, onClose, onRename }: RenameLeagueProps) {
  const [name, setName] = useState(league.name);

  return (
    <BaseDialog
      open={true}
      onClose={onClose}
      title="Rename League"
      confirmLabel="Rename"
      disableConfirm={!name.trim() || name === league.name}
      onConfirm={() => onRename(name)}
    >
      <Flex direction="column" gap="3" mb="4">
        <Text size="1" style={{ color: "var(--accent-11)", fontWeight: 500 }}>
          League Name
        </Text>
        
        <TextField.Root value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter new name" variant="soft" />
      </Flex>
    </BaseDialog>
  );
}
