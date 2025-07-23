import { Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { BaseDialog } from "~/components/shared/BaseDialog";

interface RenameRealSportProps {
  uuid: string;
  name: string;
  onClose: () => void;
  onRename: (newName: string) => void;
}

export function RenameSportDialog({ uuid, name, onClose, onRename }: RenameRealSportProps) {
  const [newName, setNewName] = useState(name);

  return (
    <BaseDialog
      open={true}
      onClose={onClose}
      title="Rename Sport"
      confirmLabel="Rename"
      disableConfirm={!newName?.trim() || newName === name}
      onConfirm={() => onRename(newName)}
    >
      <Flex direction="column" gap="3" mb="4">
        <Text size="1" style={{ color: "var(--accent-11)", fontWeight: 500 }}>
          Region Name
        </Text>
        <TextField.Root value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Enter new name" variant="soft" />
      </Flex>
    </BaseDialog>
  );
}
