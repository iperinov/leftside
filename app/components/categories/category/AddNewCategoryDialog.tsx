import { Button, Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { useCallback, useMemo, useState } from "react";
import { useCatalog } from "~/hooks/catalog/useCatalog";
import type ItemData from "~/types/ItemData";
import formatOrdinal from "~/utils/formatOrdinal";
import LoadDataDecorator from "../../loading/LoadDataDecorator";
import MultiSelectDropdown from "../../multiSelectDropdown/MultiSelectDropdown";
import { TemplateType } from "../TemplateType";
import styles from "./AddNewCategoryDialog.module.css";
import AwesomeIconSelect from "~/components/categories/category/AwesomeIconSelect";

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
          <Select.Item value={TemplateType.Parent} disabled={level >= 3 ? true : undefined}>
            {TemplateType.Parent}
          </Select.Item>
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
  templateType?: TemplateType;
  onConfirm: (name: string, type: TemplateType, sports: string[], leagues: string[], metaSport?: string, icon?: string) => void;
  onCancel?: () => void;
  validName?: (name: string) => boolean;
}

export default function AddNewCategoryDialog({
  open = true,
  level,
  templateType = TemplateType.Parent,
  onConfirm,
  onCancel = () => {},
  validName = () => true,
}: AddNewCategoryDialogProps) {
  const { data: catalog, isLoading, error } = useCatalog();
  const [isOpen, setIsOpen] = useState(open);
  const [name, setName] = useState("");
  const [type, setType] = useState<TemplateType>(templateType);
  const [selectedSportIDs, setSelectedSportsIDs] = useState<string[]>([]);
  const [selectedIconID, setSelectedIconID] = useState<string | undefined>(undefined);
  const [selectedMetaSportID, setSelectedMetaSportID] = useState<string | undefined>(undefined);
  const [selectedLeagueIDs, setSelectedLeaguesIDs] = useState<string[]>([]);

  const handleClose = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      //setName("");
      onCancel();
    },
    [onCancel]
  );

  const handleSave = useCallback(() => {
    onConfirm(name.trim(), type, selectedSportIDs, selectedLeagueIDs, selectedMetaSportID, selectedIconID);
    setIsOpen(false);
  }, [name, type, selectedLeagueIDs, selectedSportIDs, selectedMetaSportID, selectedIconID, onConfirm]);

  const handlMetaSportSelectionChange = useCallback((selectedIDs: string[]) => {
    if (selectedIDs.length > 1) throw new Error("Only one meta sport can be selected");
    setSelectedMetaSportID(selectedIDs.length >= 1 ? selectedIDs[0] : undefined);
    if (selectedIDs.length >= 1) {
      setSelectedIconID(selectedIDs[0]);
    }
  }, []);

  const handleIconSelectionChange = useCallback((selectedID?: string) => {
    setSelectedIconID(selectedID);
  }, []);

  const handleSportsSelectionChange = useCallback(
    (selectedIDs: string[]) => {
      const leaguesIDs = catalog?.filteredLeaguesBy(selectedIDs).map((l) => l.uuid) || [];
      setSelectedSportsIDs(selectedIDs);
      setSelectedLeaguesIDs(selectedLeagueIDs.filter((id) => leaguesIDs.includes(id)));
    },
    [selectedLeagueIDs, catalog]
  );

  const handleLeaguesSelectionChange = useCallback((selectedIDs: string[]) => {
    setSelectedLeaguesIDs(selectedIDs);
  }, []);

  const sportItems = useMemo((): ItemData<string>[] => {
    return catalog?.sports?.map((sport) => ({ id: String(sport.uuid), name: sport.name })) || [];
  }, [catalog]);

  const getLeagueItems = (sportIDs: string[]): ItemData<string>[] => {
    return catalog?.filteredLeaguesBy(sportIDs).map((league) => ({ id: league.uuid, name: league.name })) || [];
  };

  const validForm = useCallback(() => {
    if (!validName(name)) return false;
    if (type === TemplateType.AllLeagues && selectedSportIDs.length === 0) return false; 
    if (type === TemplateType.LiveAndUpcoming && (selectedLeagueIDs.length === 0 || selectedSportIDs.length === 0)) return false;
    return true;
  }, [name, type, level, selectedIconID, selectedSportIDs, selectedLeagueIDs, validName]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Content className={styles.content} size="3">
        {/* Title and description */}
        <Dialog.Title className={styles.title}>{`Add ${formatOrdinal(level + 1)} level`}</Dialog.Title>

        <LoadDataDecorator isLoading={isLoading} error={error}>
          <Flex direction="column" gap="3" mt="4">
            <FormRow label="Title">
              <TextField.Root value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
            </FormRow>
            <FormRow label="Type">
              <ItemTypeSelect value={type} level={level + 1} onChange={(type) => setType(type)} />
            </FormRow>
            {type === TemplateType.Parent && level === 0 && (
              <>
                <FormRow label="Select sport (optional)">
                  <MultiSelectDropdown
                    items={sportItems}
                    placeholder="Select sport (optional)"
                    defaultSelectedIDs={selectedSportIDs}
                    onSelectionChange={handlMetaSportSelectionChange}
                    maxSelections={1}
                    showAs="plain"
                  />
                </FormRow>
                <FormRow label="Select icon">
                  <AwesomeIconSelect sports={sportItems} fallbackIconID="fa-medal" selectedID={selectedIconID} onSelect={handleIconSelectionChange} />
                </FormRow>
              </>
            )}
            {(type === TemplateType.AllLeagues || type === TemplateType.LiveAndUpcoming) && (
              <FormRow label="Select sport">
                <MultiSelectDropdown items={sportItems} defaultSelectedIDs={selectedSportIDs} onSelectionChange={handleSportsSelectionChange} />
              </FormRow>
            )}
            {type === TemplateType.LiveAndUpcoming && (
              <FormRow label="Select league">
                <MultiSelectDropdown
                  items={getLeagueItems(selectedSportIDs)}
                  defaultSelectedIDs={selectedLeagueIDs}
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
          <Button onClick={handleSave} disabled={!validForm()}>
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
