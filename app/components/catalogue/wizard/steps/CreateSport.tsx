import { Checkbox, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import type { RealSport } from "~/api/ocs/ocs.types";
import { BaseDialog } from "~/components/shared/BaseDialog";

export interface CreateSportProps {
  handler: (cfg: RealSport) => void;
  onClose: () => void;
}

export const CreateSport = ({ handler, onClose }: CreateSportProps) => {
  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [gameDelayPregame, setPregameDelay] = useState("");
  const [gameDelayLive, setLiveDelay] = useState("");
  const [enabled, setEnabled] = useState(false);

  const parsedPregame = Number.parseInt(gameDelayPregame, 10);
  const parsedLive = Number.parseInt(gameDelayLive, 10);

  const isPregameValid = !Number.isNaN(parsedPregame) && parsedPregame >= 0 && parsedPregame <= 255;
  const isLiveValid = !Number.isNaN(parsedLive) && parsedLive >= 0 && parsedLive <= 255;

  const isFormValid = name.trim() !== "" && shortDesc.trim() !== "" && shortDesc.length <= 10 && isPregameValid && isLiveValid;

  return (
    <BaseDialog
      open={true}
      onClose={onClose}
      title="Create Sport"
      confirmLabel="Next Step"
      disableConfirm={!isFormValid}
      onConfirm={() => {
        handler({
          id: 0,
          uuid: "",
          name: name.trim(),
          gameDelayPregame: parsedPregame,
          gameDelayLive: parsedLive,
          shortDesc: shortDesc.trim(),
          enabled,
        });
      }}
    >
      <Flex direction="column" gap="4" mb="4">
        <Flex direction="column" gap="2">
          <Text size="1" style={{ color: "var(--accent-11)", fontWeight: 500 }}>
            Title (max 50 chars)
          </Text>
          <TextField.Root value={name} maxLength={50} onChange={(e) => setName(e.target.value)} placeholder="Enter sport name" variant="soft" />
        </Flex>

        <Flex direction="column" gap="2">
          <Text size="1" style={{ color: "var(--accent-11)", fontWeight: 500 }}>
            Short Description (max 10 chars)
          </Text>
          <TextField.Root value={shortDesc} maxLength={10} onChange={(e) => setShortDesc(e.target.value)} placeholder="Enter short desc" variant="soft" />
        </Flex>

        <Flex direction="column" gap="2">
          <Text size="1" style={{ color: "var(--accent-11)", fontWeight: 500 }}>
            Pre-game Bet Delay (0 – 255)
          </Text>
          <TextField.Root
            type="number"
            value={gameDelayPregame}
            onChange={(e) => setPregameDelay(e.target.value)}
            min={0}
            max={255}
            placeholder="Enter pregame delay"
            variant="soft"
          />
        </Flex>

        <Flex direction="column" gap="2">
          <Text size="1" style={{ color: "var(--accent-11)", fontWeight: 500 }}>
            Live Bet Delay (0 – 255)
          </Text>
          <TextField.Root
            type="number"
            value={gameDelayLive}
            onChange={(e) => setLiveDelay(e.target.value)}
            min={0}
            max={255}
            placeholder="Enter live delay"
            variant="soft"
          />
        </Flex>

        <Flex align="center" gap="2" mt="1">
          <Checkbox id="enabled" checked={enabled} onCheckedChange={(val) => setEnabled(!!val)} />
          <Text as="label" htmlFor="enabled" size="1" style={{ color: "var(--accent-11)" }}>
            Enabled
          </Text>
        </Flex>
      </Flex>
    </BaseDialog>
  );
};
