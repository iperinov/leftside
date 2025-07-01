import {
  Box,
  Button,
  Flex,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import type { LeagueRegion, RealSport } from "~/api/ocs/ocs.types";
import SearchBar from "~/components/SearchBar";
import { BaseDialog } from "~/components/shared/BaseDialog";
import { useRegions } from "~/hooks/useRegions";
import { CreationStep } from "~/stores/createLeagueStore";
import { SingleSelect } from "../../../shared/SingleSelect";

interface SelectRegionProps {
  onClose: () => void;
  onBack: (step: number) => void;
  onConfirm: (region: LeagueRegion) => void;
  onNew: (step: number) => void;
}

export function SelectRegion({
  onClose,
  onBack,
  onConfirm,
  onNew,
}: SelectRegionProps) {
  const { data: regions = [] } = useRegions();
  const [selected, setSelected] = useState<LeagueRegion | null>(null);
  const [search, setSearch] = useState("");

  const filtered = regions.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <BaseDialog
      open={true}
      onClose={onClose}
      onBack={() => {
        onBack(CreationStep.CreateSport);
      }}
      onConfirm={() => selected && onConfirm(selected)}
      title="Select Region"
      confirmLabel="Next Step"
      showCancel={false}
      disableConfirm={!selected}
      renderActionsStart={
        <Button
          variant="outline"
          color="gray"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "var(--radius-3)", // TODO: Radius not working. make it working
            backgroundColor: "transparent",
            transition: "background-color 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--gray-6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          onClick={() => {
            onNew(CreationStep.CreateRegion);
          }}
        >
          Add new Region
        </Button>
      }
    >
      <Flex direction="column" gap="3" mb="4">
        <Separator size="4" />
        <SearchBar value={search} onChange={setSearch} />
        <Separator size="4" />
        <SingleSelect
          items={filtered}
          selectedId={selected?.uuid ?? null}
          onSelect={setSelected}
          renderLabel={(r) => r.name}
          getId={(r) => r.uuid}
        />
      </Flex>
    </BaseDialog>
  );
}
