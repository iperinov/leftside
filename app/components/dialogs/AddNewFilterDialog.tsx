import { Button, Dialog, Text, Flex, TextField, Select } from "@radix-ui/themes";
import { useCallback, useState } from "react";
import { ItemType } from "~/common/itemTypes";
import formatOrdinal from "~/common/formatOrdinal";
import useSportCatalog from "~/hooks/sportCatalog/useSportCatalog";
import MultiSelectDropdown from "../multiSelectDropdown/MultiSelectDropdown";

interface AddNewFilterDialogProps {
  open?: boolean;
  level: number;
  onConfirm: (name: string) => void;
  onCancel?: () => void;
  validName?: (name: string) => boolean;
}

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

export default function AddNewFilterDialog({ open = true, level, onConfirm, onCancel = () => {}, validName = () => true }: AddNewFilterDialogProps) {
  const { error, data, isLoading: areSportsLoading } = useSportCatalog();
  const sports = data || [];
  const [isOpen, setIsOpen] = useState(open);
  const [name, setName] = useState("");
  const [type, setType] = useState<ItemType>(ItemType.All);
  const [selectedSportIDs, setSelectedSportsID] = useState<string[]>([]);
  const [selectedLeagueIDs, setSelectedLeaguesID] = useState<string[]>([]);

  const leaguesForSports = (sportIDs: string[]) => {
    if (!sports) throw new Error("Sports data is not available");
    return sportIDs.flatMap((id) => {
      const sport = sports.find((s) => s.id === id);
      return sport ? sport.leagues : [];
    });
  };

  const title = `Add ${formatOrdinal(level + 1)} level`;

  const handleClose = useCallback((open: boolean) => {
    setIsOpen(open);
    setName("");
    onCancel();
  }, [open, name]);

  const handleSave = useCallback(() => {
    onConfirm(name.trim());
    setIsOpen(false);
  }, [name, open]);

  const handleSportsSelectionChange = useCallback((selectedIDs: string[]) => {
      console.log("Selected sports IDs:", selectedIDs);
      const leaguesIDs = leaguesForSports(selectedIDs).map((l) => l.id);
      setSelectedSportsID(selectedIDs);
      setSelectedLeaguesID(selectedLeagueIDs.filter((id) => leaguesIDs.includes(id)))
  },[selectedSportIDs, selectedLeagueIDs]);

  const handleLeaguesSelectionChange = useCallback((selectedIDs: string[]) => {
      setSelectedLeaguesID(selectedIDs);
  },[selectedLeagueIDs]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Content style={{ maxWidth: 400 }} size="3">
        {/* Title and description */}
        <Dialog.Title>{title}</Dialog.Title>

        <Flex direction="column" gap="2">
          <FormRow label="Title">
            <TextField.Root value={name} placeholder="Enter name" mt="3" onChange={(e) => setName(e.target.value)} />
          </FormRow>
          <FormRow label="Type">
            <ItemTypeSelect value={type} onChange={(type) => setType(type)} />
          </FormRow>
          {(type === ItemType.All || type === ItemType.LiveAndUpcoming) && (
            <>
              <FormRow label="Select sport">
                <MultiSelectDropdown items={sports} selectedIDs={selectedSportIDs} onSelectionChange={handleSportsSelectionChange} />
              </FormRow>

              <FormRow label="Select league">
                <MultiSelectDropdown items={leaguesForSports(selectedSportIDs)} selectedIDs={selectedLeagueIDs} onSelectionChange={handleLeaguesSelectionChange} />
              </FormRow>
            </>
          )}
        </Flex>

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
