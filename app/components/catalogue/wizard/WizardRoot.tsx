import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog } from "radix-ui";
import { useEffect } from "react";
import { toast } from "sonner";
import { useCatalog } from "~/hooks/catalog/useCatalog";
import { CreationStep, useCreateLeagueStore } from "~/stores/createLeagueStore";
import { ConfirmSubmission } from "./steps/ConfirmSubmission";
import { CreateLeague } from "./steps/CreateLeague";
import { CreateRegion } from "./steps/CreateRegion";
import { CreateSport } from "./steps/CreateSport";
import { SelectRegion } from "./steps/SelectRegion";
import { useCreateLeague } from "~/hooks/catalog/useCreateLeague";
import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import type { CreateLeagueRequest, ExistingRegion, League, RealSport, Region } from "~/api/sccs/types.gen";

export interface WizzardProps {
  onClose: () => void;
  create: (req: CreateLeagueRequest) => void;
  sportId?: string;
  regionId?: string;
}

export const WizzardRoot = ({ onClose, create, sportId, regionId }: WizzardProps) => {
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
  const createLeague = useCreateLeague({
    onSuccess: (data) => {
      console.log("League created successfully:", data);
      toast.success("League created successfully");
      onClose();
    },
    onError: (error) => {
      console.error("Error creating league:", error);
      toast.error(`Failed to create league: ${error.message}`);
    },
  });
  const showSelectRegionBack = Boolean(sportId);

  useEffect(() => {
    clearState();

    if (sportId) {
      const foundSport = catalog?.findSport(sportId);
      if (foundSport) setSportRegion(foundSport);
      else setSportRegion({ uuid: sportId });
    }

    if (regionId) {
      const foundRegion = catalog?.findRegion(regionId);
      if (foundRegion) setRegion(foundRegion);
      else setRegion({ uuid: regionId });
    }
  }, [clearState, setSportRegion, setRegion, sportId, regionId, catalog]);

  const handleSport = (sport: RealSport) => {
    console.log("handleSport", sport);
    setSport(sport);
  };

  const handleRegion = (region: Region) => {
    console.log("handleRegion", region);
    setRegion(region);
  };

  const handleSelectRegion = (region: ExistingRegion) => {
    console.log("handleSelectRegion", region);
    setSelectRegion(region);
  };

  const handleLeague = (league: League) => {
    console.log("handleLeague", league);
    setLeague(league);
  };

  const handleConfirm = () => {
    const req = getRequest();
    console.log("create league: ", req);
    if (req) {
      createLeague.mutate({ body: req });
    } else {
      toast.error("Failed to create league");
      throw new Error("Invalid Create League request");
    }
  };

  const getSportName = (sport: RealSport | ExistingRegion | undefined): string | undefined => {
    if (!sport) return undefined;
    return "description" in sport ? sport.description : catalog?.findSport(sport.uuid)?.name;
  };

  const getRegionName = (region: Region | ExistingRegion | undefined): string | undefined => {
    if (!region) return undefined;
    return "description" in region ? region.description : catalog?.findRegion(region.uuid)?.name;
  };

  return (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialogOverlay" />
        <Dialog.Close className="dialogClose" onClick={onClose} />
        <LoadDataDecorator isLoading={createLeague.isPending || isLoading} error={error || createLeague.error}>
          <Dialog.Content className="dialogContent" aria-describedby={undefined}>
            <Dialog.Title>
              <VisuallyHidden>Wizard</VisuallyHidden>
            </Dialog.Title>

            {step === CreationStep.Invalid && <p>ERROR!</p>}

            {step === CreationStep.CreateSport && <CreateSport handler={handleSport} onClose={onClose} />}

            {step === CreationStep.SelectRegion && (
              <SelectRegion onConfirm={handleSelectRegion} onClose={onClose} onBack={!showSelectRegionBack ? setGoToStep : undefined} onNew={setGoToStep} />
            )}

            {step === CreationStep.CreateRegion && <CreateRegion handler={handleRegion} onClose={onClose} onBack={setGoToStep} showCancel={false} />}

            {step === CreationStep.CreateLeague && <CreateLeague handler={handleLeague} onClose={onClose} />}

            {step === CreationStep.Confirm && (
              <ConfirmSubmission
                handler={handleConfirm}
                onClose={onClose}
                onBack={setGoToStep}
                sportTitle={getSportName(dataState.realSport) || "-"}
                regionTitle={getRegionName(dataState.region) || "-"}
                leagueTitle={dataState.league?.description || "-"}
              />
            )}
          </Dialog.Content>
        </LoadDataDecorator>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
