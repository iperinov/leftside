import { Box, Checkbox, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import type { League } from "~/api/sccs/types.gen";
import { BaseDialog } from "~/components/shared/BaseDialog";
import { useTakeBackProfile } from "~/hooks/useTakeBackProfile";

export interface CreateLeagueProps {
  handler: (cfg: League) => void;
  onClose: () => void;
}

export const CreateLeague = ({ handler, onClose }: CreateLeagueProps) => {
  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [order, setOrder] = useState("");
  const [takeBackProfile, setTakeBackProfile] = useState("");
  const [teamFKRequired, setTeamFKRequired] = useState(true);
  const [hideForMaster, setHideForMaster] = useState(false);
  const [enabled, setEnabled] = useState(true);

  const { data: tbProfiles = [] } = useTakeBackProfile();

  const parsedOrder = Number(order);
  const isFormValid =
    name.trim() !== "" &&
    shortDesc.trim() !== "" &&
    takeBackProfile !== "" &&
    order.trim() !== "" &&
    !Number.isNaN(parsedOrder) &&
    parsedOrder >= 0 &&
    parsedOrder <= 1000;

  return (
    <BaseDialog
      open={true}
      onClose={onClose}
      title="Create League"
      confirmLabel="Create League"
      disableConfirm={!isFormValid}
      onConfirm={() => {
        handler({
          sport: "",
          description: name,
          short: shortDesc,
          order: parsedOrder,
          teamFkRequired: teamFKRequired,
          takebackProfile: Number.parseInt(takeBackProfile),
          hideForMaster: hideForMaster,
          enabled,
        });
      }}
    >
      <Flex direction="column" gap="4" mb="4">
        <Box>
          <Text as="label" size="1" weight="medium" mb="1" style={{ color: "var(--accent-11)" }}>
            Title (max 50 chars)
          </Text>
          <TextField.Root value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter league name" variant="soft" />
        </Box>

        <Box>
          <Text as="label" size="1" weight="medium" mb="1" style={{ color: "var(--accent-11)" }}>
            Short Description
          </Text>
          <TextField.Root value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} placeholder="Short description" maxLength={20} variant="soft" />
        </Box>

        <Box>
          <Text as="label" size="1" weight="medium" mb="1" style={{ color: "var(--accent-11)" }}>
            Order (0 – 1000)
          </Text>
          <TextField.Root type="number" value={order} onChange={(e) => setOrder(e.target.value)} min={0} max={1000} placeholder="Enter order" variant="soft" />
        </Box>

        <Box>
          <Text as="label" size="1" weight="medium" mb="1" style={{ color: "var(--accent-11)" }}>
            Take Back Profile
          </Text>
          <Box mt="1">
            <Select.Root value={takeBackProfile} onValueChange={(val) => setTakeBackProfile(val)}>
              <Select.Trigger placeholder="Select take-back profile" />
              <Select.Content>
                {tbProfiles.map((tbp) => (
                  <Select.Item key={tbp.id} value={tbp.id?.toString() || ""}>
                    {tbp.description}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Box>
        </Box>

        <Flex align="center" gap="2">
          <Checkbox checked={teamFKRequired} onCheckedChange={(val) => setTeamFKRequired(Boolean(val))} />
          <Text size="1" as="label">
            Team FK Required
          </Text>
        </Flex>

        <Flex align="center" gap="2">
          <Checkbox checked={hideForMaster} onCheckedChange={(val) => setHideForMaster(Boolean(val))} />
          <Text size="1" as="label">
            Hide For Master
          </Text>
        </Flex>

        <Flex align="center" gap="2">
          <Checkbox checked={enabled} onCheckedChange={(val) => setEnabled(Boolean(val))} />
          <Text size="1" as="label">
            Enabled
          </Text>
        </Flex>
      </Flex>
    </BaseDialog>
  );
};
