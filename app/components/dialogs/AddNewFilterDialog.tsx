import { Button, Dialog, Text, Flex, TextField, Select } from "@radix-ui/themes";
import { useState } from "react";
import { ItemType } from "~/common/itemTypes";
import formatOrdinal from "~/common/formatOrdinal";
import useSportCatalog from "~/hooks/sportCatalog/useSportCatalog";
import { type Sport, type League } from "~/common/sport";


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
  )
}

interface SportsSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  sports?: Sport[];
}

function SportsSelect({ value, onChange, sports }: SportsSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          {sports?.map((sport) => (
            <Select.Item value={sport.id} key={sport.id}>{sport.name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}


interface SportsSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  leagues?: League[];
}
function LeaguesSelect({ value, onChange, leagues }: SportsSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          {leagues?.map((league) => (
            <Select.Item value={league.id} key={league.id}>{league.name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default function AddNewFilterDialog({ 
  open = true, 
  level,  
  onConfirm,
  onCancel = () => {}, 
  validName = () => true
}: AddNewFilterDialogProps) {
  const {error, data: sports, isLoading: areSportsLoading} = useSportCatalog()
  const [isOpen, setIsOpen] = useState(open);
  const [name, setName] = useState("");
  const [type, setType] = useState<ItemType>();
  const [sportID, setSportID] = useState<string>();
  const [leagueID, setLeagueID] = useState<string>();

  const title = `Add ${formatOrdinal(level)} level`;

  const handleSave = () => {
    onConfirm(name.trim());
    setIsOpen(false);
  };

  const leaguesForSport = () => {
    const sport = sports?.find(s => s.id === sportID);
    return sport ? sport.leagues : [];
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content style={{ maxWidth: 400 }} size="3">
        {/* Title and description */}
        <Dialog.Title>{title}</Dialog.Title>
        
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold"> Title </Text>
            <TextField.Root value={name} placeholder="Enter name" mt="3" onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold"> Type </Text>
            <ItemTypeSelect value={type} onChange={(type) => setType(type)} />
          </label>
          {(type === ItemType.All || type === ItemType.LiveAndUpcoming) && (<>
            <label>
              <Text as="div" size="2" mb="1" weight="bold"> Select sport </Text>
              <SportsSelect value={sportID} onChange={(sport) => setSportID(sport)} sports={sports}/>
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold"> Select league </Text>
              <LeaguesSelect value={leagueID} onChange={(leagueID) => setLeagueID(leagueID)} leagues={leaguesForSport()}/>
            </label>
          </>)}
        </Flex>

        {/* Buttons */}
        <Flex justify="end" gap="3" mt="4">
          <Dialog.Close>
            <Button onClick={onCancel} variant="soft"> Cancel </Button>
          </Dialog.Close>
          <Button 
            onClick={handleSave} 
            disabled={name === "" || !validName(name)
          }>
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
