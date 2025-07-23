import { Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { BaseDialog } from "~/components/shared/BaseDialog";

interface RenameLeagueProps {
  uuid: string; 
  name: string;
  onClose: () => void;
  onRename: (newName: string) => void;
}

export function RenameLeagueDialog({ uuid, name, onClose, onRename }: RenameLeagueProps) {
  const [newName, setNewName] = useState(name);

  return (
    <BaseDialog
      open={true}
      onClose={onClose}
      title="Rename League"
      confirmLabel="Rename"
      disableConfirm={!newName.trim() || newName === name}
      onConfirm={() => onRename(name)}
    >
      <Flex direction="column" gap="3" mb="4">
        <Text size="1" style={{ color: "var(--accent-11)", fontWeight: 500 }}>
          League Name
        </Text>

        <TextField.Root value={name} onChange={(e) => setNewName(e.target.value)} placeholder="Enter new name" variant="soft" />
      </Flex>
    </BaseDialog>
  );
}
