import { Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import type { RenameRealSportApiIn } from "~/types/sport/types";
import { BaseDialog } from "~/components/shared/BaseDialog";

interface RenameRealSportProps {
  sport: RenameRealSportApiIn;
  onClose: () => void;
  onRename: (newName: string) => void;
}

export function RenameSportDialog({ sport, onClose, onRename }: RenameRealSportProps) {
  const [name, setName] = useState(sport.name);

  return (
    <BaseDialog
      open={true}
      onClose={onClose}
      title="Rename Sport"
      confirmLabel="Rename"
      disableConfirm={!name?.trim() || name === sport.name}
      onConfirm={() => onRename(name)}
    >
      <Flex direction="column" gap="3" mb="4">
        <Text size="1" style={{ color: "var(--accent-11)", fontWeight: 500 }}>
          Region Name
        </Text>
        <TextField.Root value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter new name" variant="soft" />
      </Flex>
    </BaseDialog>
  );
}
