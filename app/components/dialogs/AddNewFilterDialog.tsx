import { Button, Dialog, Text, Flex, TextField, Select } from "@radix-ui/themes";
import { useState } from "react";
import { ItemType } from "~/common/itemTypes";
import formatOrdinal from "~/common/formatOrdinal";
import useSportCatalog from "~/hooks/sportCatalog/useSportCatalog";
import { type Sport, type League } from "~/common/sport";
import styles from "./AddNewFilterDialog.module.css";
import MultiSelectDropdown from "../multiSelectDropdown/MultiSelectDropdown";
import { Item } from "@radix-ui/themes/components/checkbox-group.primitive";

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

export default function AddNewFilterDialog({ open = true, level, onConfirm, onCancel = () => {}, validName = () => true }: AddNewFilterDialogProps) {
  const { error, data, isLoading: areSportsLoading } = useSportCatalog();
  const sports = data || [];
  const [isOpen, setIsOpen] = useState(open);
  const [name, setName] = useState("");
  const [type, setType] = useState<ItemType>(ItemType.All);
  const [selectedSportIDs, setSelectedSportsID] = useState<string[]>([]);
  const [selectedLeagueIDs, setSelectedLeaguesID] = useState<string[]>([]);

  const title = `Add ${formatOrdinal(level)} level`;

  const handleSave = () => {
    onConfirm(name.trim());
    setIsOpen(false);
  };

  const leaguesForSelectedSports = () => {
    if (!sports) throw new Error("Sports data is not available");
    return selectedSportIDs.flatMap((id) => {
      const sport = sports.find((s) => s.id === id);
      return sport ? sport.leagues : [];
    });
  };

  const onSportsChange = (selectedIDs: string[]) => {
    setSelectedSportsID(selectedIDs);
  };

  const onLeaguesChange = (selectedIDs: string[]) => {
    setSelectedLeaguesID(selectedIDs);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content style={{ maxWidth: 400 }} size="3">
        {/* Title and description */}
        <Dialog.Title>{title}</Dialog.Title>

        <Flex direction="column" gap="2">
          <Flex direction="column" gap="1">
            <Text as="div" size="2">
              Title
            </Text>
            <TextField.Root value={name} placeholder="Enter name" mt="3" onChange={(e) => setName(e.target.value)} />
          </Flex>
          <Flex direction="column" gap="1">
            <Text as="div" size="2" mb="1">
              Type
            </Text>
            <ItemTypeSelect value={type} onChange={(type) => setType(type)} />
          </Flex>
          {(type === ItemType.All || type === ItemType.LiveAndUpcoming) && (
            <>
              <Flex direction="column" gap="1">
                <Text as="div" size="2" mb="1">
                  Select sport
                </Text>
                <MultiSelectDropdown items={sports} selectedIDs={selectedSportIDs} onSelectionChange={onSportsChange} />
              </Flex>

              <Flex direction="column" gap="1">
                <Text as="div" size="2" mb="1">
                  Select league
                </Text>
                <MultiSelectDropdown items={leaguesForSelectedSports()} selectedIDs={selectedLeagueIDs} onSelectionChange={onLeaguesChange} />
              </Flex>
            </>
          )}
        </Flex>

        {/* Buttons */}
        <Flex justify="end" gap="3" mt="4">
          <Dialog.Close>
            <Button onClick={onCancel} variant="soft">
              {" "}
              Cancel{" "}
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
