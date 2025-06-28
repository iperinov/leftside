import { Button, Dialog, Text, Flex, TextField, Select } from "@radix-ui/themes";
import { useCallback, useState } from "react";
import { ItemType } from "~/common/itemTypes";
import formatOrdinal from "~/common/formatOrdinal";
import MultiSelectDropdown from "../multiSelectDropdown/MultiSelectDropdown";
import styles from "./AddNewConfigurationDialog.module.css";
import { useLeagues } from "~/hooks/useLeagues";
import LoadDataDecorator from "../loading/LoadDataDecorator";
import { useRealSports } from "~/hooks/useRealSport";

interface ItemTypeSelectProps {
  value?: ItemType;
  onChange?: (value: ItemType) => void;
}

function ItemTypeSelect({ value, onChange }: ItemTypeSelectProps) {
  return (
    <Select.Root value={value || ItemType.Parent} onValueChange={onChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Items</Select.Label>
          <Select.Item value={ItemType.Parent}>{ItemType.Parent}</Select.Item>
          <Select.Item value={ItemType.Child}>{ItemType.Child}</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Predefined templates</Select.Label>
          <Select.Item value={ItemType.All}>{ItemType.All}</Select.Item>
          <Select.Item value={ItemType.LiveAndUpcoming}>{ItemType.LiveAndUpcoming}</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

interface FormRowProps {
  label: string;
}

function FormRow({ label, children }: React.PropsWithChildren<FormRowProps>) {
  return (
    <Flex direction="column" gap="1">
      <Text as="div" size="2" mb="1">
        {label}
      </Text>
      {children}
    </Flex>
  );
}

interface AddNewFilterDialogProps {
  open?: boolean;
  level: number;
  onConfirm: (name: string, type: ItemType, sports: string[], leagues: string[]) => void;
  onCancel?: () => void;
  validName?: (name: string) => boolean;
}

export default function AddNewConfigurationDialog({ open = true, level, onConfirm, onCancel = () => {}, validName = () => true }: AddNewFilterDialogProps) {
  const { error: sportsError, data: sports, isLoading: isSportsLoading } = useRealSports();
  const { error: leaguesError, data: leagues, isLoading: isLeaguesLoading } = useLeagues();
  const [isOpen, setIsOpen] = useState(open);
  const [name, setName] = useState("");
  const [type, setType] = useState<ItemType>(ItemType.All);
  const [selectedSportUUIDs, setSelectedSportsUUIDs] = useState<string[]>([]);
  const [selectedLeagueUUIDs, setSelectedLeaguesUUIDs] = useState<string[]>([]);

  
  const handleClose = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      //setName("");
      onCancel();
    },
    [open, name]
  );

  const handleSave = useCallback(() => {
    onConfirm(name.trim(), type, selectedSportUUIDs, selectedLeagueUUIDs);
    setIsOpen(false);
  }, [name, open]);

  const handleSportsSelectionChange = useCallback(
    (selectedUUIDs: string[]) => {
      const leaguesIDs = leaguesForSports(selectedUUIDs).map((l) => l.uuid);
      setSelectedSportsUUIDs(selectedUUIDs);
      setSelectedLeaguesUUIDs(selectedLeagueUUIDs.filter((uuid) => leaguesIDs.includes(uuid)));
    },
    [selectedSportUUIDs, selectedLeagueUUIDs]
  );

  const handleLeaguesSelectionChange = useCallback(
    (selectedUUIDs: string[]) => {
      setSelectedLeaguesUUIDs(selectedUUIDs);
    },
    [selectedLeagueUUIDs]
  );


  const leaguesForSports = (sportUUIDs: string[]) => {
    return sportUUIDs.flatMap((sportUUID) => leagues?.filter((league) => league.sportId === sportUUID) || []);
  };

  console.log("leaguesForSports ", selectedSportUUIDs, leaguesForSports(selectedSportUUIDs), leagues);

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Content className={styles.content} size="3">
        {/* Title and description */}
        <Dialog.Title className={styles.title}>{`Add ${formatOrdinal(level + 1)} level`}</Dialog.Title>

        <LoadDataDecorator isLoading={isSportsLoading || isLeaguesLoading} error={sportsError && leaguesError}>
          <Flex direction="column" gap="3" mt="4">
            <FormRow label="Title">
              <TextField.Root value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
            </FormRow>
            <FormRow label="Type">
              <ItemTypeSelect value={type} onChange={(type) => setType(type)} />
            </FormRow>
            {(type === ItemType.All || type === ItemType.LiveAndUpcoming) && (
              <>
                <FormRow label="Select sport">
                  <MultiSelectDropdown items={sports} selectedIDs={selectedSportUUIDs} onSelectionChange={handleSportsSelectionChange} />
                </FormRow>

                <FormRow label="Select league">
                  <MultiSelectDropdown
                    items={leaguesForSports(selectedSportUUIDs)}
                    selectedIDs={selectedLeagueUUIDs}
                    onSelectionChange={handleLeaguesSelectionChange}
                  />
                </FormRow>
              </>
            )}
          </Flex>
        </LoadDataDecorator>
        {/* Buttons */}
        <Flex justify="end" gap="3" mt="4">
          <Dialog.Close>
            <Button onClick={onCancel} variant="soft">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={handleSave} disabled={name === "" || !validName(name)}>
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
