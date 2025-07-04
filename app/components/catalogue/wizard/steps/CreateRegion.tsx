import { Box, Checkbox, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import type { LeagueRegion } from "~/api/ocs/ocs.types";
import { BaseDialog } from "~/components/shared/BaseDialog";
import { CreationStep } from "~/stores/createLeagueStore";

export interface CreateRegionProps {
  handler: (cfg: LeagueRegion) => void;
  onBack?: (step: number) => void;
  onClose: () => void;
  showCancel?: boolean;
}

export const CreateRegion = ({ handler, onBack, onClose, showCancel = false }: CreateRegionProps) => {
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  const [enabled, setEnabled] = useState(false);

  const parsedOrder = Number.parseInt(order, 10);
  const isValidOrder = !Number.isNaN(parsedOrder) && parsedOrder >= 0 && parsedOrder <= 1000;
  const isFormValid = name.trim() !== "" && isValidOrder;

  return (
    <BaseDialog
      open={true}
      onClose={onClose}
      onBack={onBack ? () => onBack(CreationStep.SelectRegion) : undefined}
      showCancel={showCancel}
      title="Create Region"
      confirmLabel="Next Step"
      disableConfirm={!isFormValid}
      onConfirm={() => {
        handler({
          id: 0,
          uuid: "",
          name: name.trim(),
          order: parsedOrder,
          enabled,
        });
      }}
    >
      <Flex direction="column" gap="4" mb="4">
        <Flex direction="column" gap="2">
          <Text size="1" style={{ color: "var(--accent-11)", fontWeight: 500 }}>
            Title (max 50 chars)
          </Text>
          <TextField.Root
            value={name}
            maxLength={50}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter region name"
            variant="soft"
            className="inputField"
          />
        </Flex>

        <Flex direction="column" gap="2">
          <Text size="1" style={{ color: "var(--accent-11)", fontWeight: 500 }}>
            Order (0 – 999)
          </Text>
          <TextField.Root type="number" value={order} onChange={(e) => setOrder(e.target.value)} placeholder="Enter order" variant="soft" min={0} max={999} />
        </Flex>

        <Flex align="center" gap="2" mt="2">
          <Checkbox id="enabled" checked={enabled} onCheckedChange={(val) => setEnabled(!!val)} />
          <Text as="label" htmlFor="enabled" size="1" style={{ color: "var(--accent-11)" }}>
            Enabled
          </Text>
        </Flex>
      </Flex>
    </BaseDialog>
  );
};
