import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog } from "radix-ui";
import { useEffect } from "react";
import { toast } from "sonner";
import type { BasicEntity, League, LeagueRegion, RealSport } from "~/api/ocs/ocs.types";
import { useCatalog } from "~/hooks/catalog/useCatalog";
import { type CreateLeagueRequest, CreationStep, useCreateLeagueStore } from "~/stores/createLeagueStore";
import { ConfirmSubmission } from "./steps/ConfirmSubmission";
import { CreateLeague } from "./steps/CreateLeague";
import { CreateRegion } from "./steps/CreateRegion";
import { CreateSport } from "./steps/CreateSport";
import { SelectRegion } from "./steps/SelectRegion";

// Safely extract `.name` from union types
function getEntityName(entity: RealSport | LeagueRegion | League | { uuid: string } | undefined): string {
  return entity && "name" in entity ? entity.name : "—";
}

export interface WizzardProps {
  open: boolean;
  onClose: () => void;
  create: (req: CreateLeagueRequest) => void;
  sportId?: string;
  regionId?: string;
}

export const WizzardRoot = ({ open, onClose, create, sportId, regionId }: WizzardProps) => {
  const step = useCreateLeagueStore((s) => s.step);
  const setSport = useCreateLeagueStore((s) => s.setSport);
  const setSportRegion = useCreateLeagueStore((s) => s.setSportRegion);
  const setSelectRegion = useCreateLeagueStore((s) => s.setSelectRegion);
  const setRegion = useCreateLeagueStore((s) => s.setRegion);
  const setLeague = useCreateLeagueStore((s) => s.setLeague);
  const setGoToStep = useCreateLeagueStore((s) => s.setGoToStep);
  const getRequest = useCreateLeagueStore((s) => s.getRequest);
  const clearState = useCreateLeagueStore((s) => s.clearState);
  const dataState = useCreateLeagueStore((s) => s.data);

  const { data: catalog, isLoading, error } = useCatalog();

  const showCancel = Boolean(sportId);

  useEffect(() => {
    if (open) {
      clearState();

      if (sportId) {
        const foundSport = catalog?.findSport(sportId);
        if (foundSport) setSportRegion(foundSport);
        else setSportRegion({ uuid: sportId, name: sportId });
      }

      if (regionId) {
        const foundRegion = catalog?.findRegion(regionId);
        if (foundRegion) setRegion(foundRegion);
        else setRegion({ uuid: regionId, name: regionId });
      }
    }
  }, [open, clearState, setSportRegion, setRegion, sportId, regionId, catalog]);

  const handleSport = (sport: RealSport) => {
    console.log("handleSport", sport);
    setSport(sport);
  };

  const handleRegion = (region: LeagueRegion) => {
    console.log("handleRegion", region);
    setRegion(region);
  };

  const handleSelectRegion = (region: BasicEntity) => {
    console.log("handleSelectRegion", region);
    setSelectRegion(region);
  };

  const handleLeague = (league: League) => {
    console.log("handleLeague", league);
    setLeague(league);
  };

  const handleConfirm = () => {
    const req = getRequest();
    console.log("handleConfirm", req);
    if (req) {
      create(req);
      toast.success("League created successfully");
    } else {
      toast.error("Failed to create league");
      throw new Error("Invalid Create League request");
    }
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialogOverlay" />
        <Dialog.Content className="dialogContent" aria-describedby={undefined}>
          <Dialog.Title>
            <VisuallyHidden>Wizard</VisuallyHidden>
          </Dialog.Title>

          {step === CreationStep.Invalid && <p>ERROR!</p>}

          {step === CreationStep.CreateSport && <CreateSport handler={handleSport} onClose={onClose} />}

          {step === CreationStep.SelectRegion && <SelectRegion onConfirm={handleSelectRegion} onClose={onClose} onBack={setGoToStep} onNew={setGoToStep} />}

          {step === CreationStep.CreateRegion && (
            <CreateRegion handler={handleRegion} onClose={onClose} onBack={!showCancel ? setGoToStep : undefined} showCancel={showCancel} />
          )}

          {step === CreationStep.CreateLeague && <CreateLeague handler={handleLeague} onClose={onClose} />}

          {step === CreationStep.Confirm && (
            <ConfirmSubmission
              handler={handleConfirm}
              onClose={onClose}
              onBack={setGoToStep}
              sportTitle={getEntityName(dataState.realSport)}
              regionTitle={getEntityName(dataState.region)}
              leagueTitle={getEntityName(dataState.league)}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
