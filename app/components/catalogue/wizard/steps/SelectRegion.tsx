import { Box, Button, Flex, Separator, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import type { BasicEntity, LeagueRegion, RealSport } from "~/api/ocs/ocs.types";
import SearchBar from "~/components/SearchBar";
import { BaseDialog } from "~/components/shared/BaseDialog";
import { useCatalog } from "~/hooks/catalog/useCatalog";
import { CreationStep } from "~/stores/createLeagueStore";
import { SingleSelect } from "../../../shared/SingleSelect";

interface SelectRegionProps {
  onClose: () => void;
  onBack?: (step: number) => void;
  onConfirm: (region: BasicEntity) => void;
  onNew: (step: number) => void;
}

export function SelectRegion({ onClose, onBack, onConfirm, onNew }: SelectRegionProps) {
  const { data: catalog, isLoading, error } = useCatalog();
  const [selected, setSelected] = useState<BasicEntity | null>(null);
  const [search, setSearch] = useState("");

  const filtered = catalog
    ?.allUniqueRegions()
    .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <BaseDialog
      open={true}
      onClose={onClose}
      onBack={onBack ? () => onBack(CreationStep.CreateSport) : undefined}
      onConfirm={() => selected && onConfirm(selected)}
      title="Select Region"
      confirmLabel="Next Step"
      showCancel={!onBack}
      disableConfirm={!selected}
      renderActionsStart={
        <Button
          variant="outline"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "var(--radius-3)", // TODO: Radius not working. make it working
            backgroundColor: "var(--accent-4)",
            transition: "background-color 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent-6)";
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
        <SingleSelect items={filtered || []} selectedId={selected?.uuid ?? null} onSelect={setSelected} renderLabel={(r) => r.name} getId={(r) => r.uuid} />
      </Flex>
    </BaseDialog>
  );
}
