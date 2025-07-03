import { Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import type { RenameLeagueRegionApiIn } from "~/api/ocs/ocs.types";
import { BaseDialog } from "~/components/shared/BaseDialog";

interface RenameRegionProps {
  region: RenameLeagueRegionApiIn;
  onClose: () => void;
  onRename: (newName: string) => void;
}

export function RenameRegionDialog({
  region,
  onClose,
  onRename,
}: RenameRegionProps) {
  const [name, setName] = useState(region.name);

  return (
    <BaseDialog
      open={true}
      onClose={onClose}
      title="Rename Region"
      confirmLabel="Rename"
      disableConfirm={!name?.trim() || name === region.name}
      onConfirm={() => onRename(name)}
    >
      <Flex direction="column" gap="3" mb="4">
        <Text size="1" style={{ color: "var(--accent-11)", fontWeight: 500 }}>
          Region Name
        </Text>
        <TextField.Root
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new name"
          variant="soft"
        />
      </Flex>
    </BaseDialog>
  );
}
