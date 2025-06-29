import { Button, Dialog, Text, Flex, TextField, Select } from "@radix-ui/themes";
import { useCallback, useState } from "react";
import formatOrdinal from "~/common/formatOrdinal";
import MultiSelectDropdown from "../multiSelectDropdown/MultiSelectDropdown";
import styles from "./AddNewCategoryDialog.module.css";
import { useLeagues } from "~/hooks/useLeagues";
import LoadDataDecorator from "../loading/LoadDataDecorator";
import { useRealSports } from "~/hooks/useRealSport";
import type { League } from "~/api/ocs/ocs.types";
import { TemplateType } from "./TemplateType";
import type ItemData from "./ItemData";

interface ItemTypeSelectProps {
  value?: TemplateType;
  level: number;
  onChange?: (value: TemplateType) => void;
}

function ItemTypeSelect({ value, level, onChange }: ItemTypeSelectProps) {
  return (
    <Select.Root value={value || TemplateType.Parent} onValueChange={onChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Items</Select.Label>
          <Select.Item value={TemplateType.Parent} disabled={level >= 3 ? true : undefined}>{TemplateType.Parent}</Select.Item>
          <Select.Item value={TemplateType.Child}>{TemplateType.Child}</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Predefined templates</Select.Label>
          <Select.Item value={TemplateType.AllLeagues}>{TemplateType.AllLeagues}</Select.Item>
          <Select.Item value={TemplateType.LiveAndUpcoming}>{TemplateType.LiveAndUpcoming}</Select.Item>
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

interface AddNewCategoryDialogProps {
  open?: boolean;
  level: number;
  onConfirm: (name: string, type: TemplateType, sports: string[], leagues: string[]) => void;
  onCancel?: () => void;
  validName?: (name: string) => boolean;
}

export default function AddNewCategoryDialog({ open = true, level, onConfirm, onCancel = () => {}, validName = () => true }: AddNewCategoryDialogProps) {
  const { error: sportsError, data: sports, isLoading: isSportsLoading } = useRealSports();
  const { error: leaguesError, data: leagues, isLoading: isLeaguesLoading } = useLeagues();
  const [isOpen, setIsOpen] = useState(open);
  const [name, setName] = useState("");
  const [type, setType] = useState<TemplateType>(TemplateType.Child);
  const [selectedSportIDs, setSelectedSportsIDs] = useState<string[]>([]);
  const [selectedLeagueIDs, setSelectedLeaguesIDs] = useState<string[]>([]);

  
  const handleClose = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      //setName("");
      onCancel();
    },
    [open, name]
  );

  const handleSave = useCallback(() => {
    onConfirm(name.trim(), type, selectedSportIDs, selectedLeagueIDs);
    setIsOpen(false);
  }, [name, open]);

  const handleSportsSelectionChange = useCallback(
    (selectedIDs: string[]) => {
      const leaguesIDs = leaguesForSports(selectedIDs).map((l) => l.uuid);
      setSelectedSportsIDs(selectedIDs);
      setSelectedLeaguesIDs(selectedLeagueIDs.filter((id) => leaguesIDs.includes(id)));
    },
    [selectedSportIDs, selectedLeagueIDs]
  );

  const handleLeaguesSelectionChange = useCallback(
    (selectedIDs: string[]) => {
      setSelectedLeaguesIDs(selectedIDs);
    },
    [selectedLeagueIDs]
  );

  const getSportItems = (): ItemData<string>[] => {
    return sports?.map((sport) => ({
      id: String(sport.id),
      name: sport.name,
    })) || [];
  };

  const leaguesForSports = (sportIDs: string[]): League[] => {
    return sportIDs.flatMap((sportID) => leagues?.filter((league) => String(league.realSportId) === sportID) || []);
  };

  const getLeagueItems = (sportIDs: string[]): ItemData<string>[] => {
    const filteredLeagues = leaguesForSports(sportIDs);
    return filteredLeagues.map((league) => ({
      id: league.uuid,
      name: league.name
    })) || [];
  };

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
              <ItemTypeSelect value={type} level={level + 1} onChange={(type) => setType(type)} />
            </FormRow>
            {(type === TemplateType.AllLeagues || type === TemplateType.LiveAndUpcoming) && (
                <FormRow label="Select sport">
                  <MultiSelectDropdown items={getSportItems()} selectedIDs={selectedSportIDs} onSelectionChange={handleSportsSelectionChange} />
                </FormRow>
            )}
            {(type === TemplateType.LiveAndUpcoming) && (
                <FormRow label="Select league">
                  <MultiSelectDropdown
                    items={getLeagueItems(selectedSportIDs)}
                    selectedIDs={selectedLeagueIDs}
                    onSelectionChange={handleLeaguesSelectionChange}
                  />
                </FormRow>
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
