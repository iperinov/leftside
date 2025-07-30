import { create } from "zustand";
import type { CreateLeagueRequest, ExistingRealSport, ExistingRegion, League, RealSport, Region } from "~/api/sccs/types.gen";

export type CreateLeagueData = Partial<CreateLeagueRequest>;

export enum CreationStep {
  Invalid = 0,
  CreateSport = 1,
  SelectRegion = 2,
  CreateRegion = 3,
  CreateLeague = 4,
  Confirm = 5,
}

interface LeagueStore {
  data: CreateLeagueData;
  step: CreationStep;
  setSport: (cofig: RealSport | ExistingRealSport) => void;
  setSportRegion: (cofig: RealSport | ExistingRealSport) => void;
  setRegion: (cofig: Region | ExistingRegion) => void;
  setSelectRegion: (cofig: Region | ExistingRegion) => void;
  setLeague: (cofig: League) => void;
  setGoToStep: (step: CreationStep) => void;
  getRequest: () => CreateLeagueRequest | undefined;
  clearState: () => void;
}

export const useCreateLeagueStore = create<LeagueStore>((set, get) => ({
  data: {
    realSport: undefined,
    region: undefined,
    league: undefined,
  },
  step: CreationStep.CreateSport,
  setSport: (config) => {
    set((prev) => {
      console.log("setSport", prev, config);
      return {
        data: {
          ...prev.data,
          realSport: config,
        },
        step: CreationStep.SelectRegion,
      };
    });
  },
  setSportRegion: (config) => {
    set((prev) => {
      console.log("setSportRegion", prev, config);
      return {
        data: {
          ...prev.data,
          realSport: config,
        },
        step: CreationStep.SelectRegion,
      };
    });
  },
  setRegion: (config) => {
    set((prev) => {
      console.log("setRegion", prev, config);
      return {
        data: {
          ...prev.data,
          region: config,
        },
        step: CreationStep.CreateLeague,
      };
    });
  },
  setSelectRegion: (config) => {
    set((prev) => {
      console.log("setSelectRegion", prev, config);
      return {
        data: {
          ...prev.data,
          region: config,
        },
        step: CreationStep.CreateLeague,
      };
    });
  },
  setLeague: (config) => {
    set((prev) => {
      console.log("setLeague", prev, config);
      return {
        data: {
          ...prev.data,
          league: config,
        },
        step: CreationStep.Confirm,
      };
    });
  },
  setGoToStep: (step) => {
    set((prev) => {
      console.log("setGoToStep", prev, step);
      return {
        data: prev.data,
        step: step,
      };
    });
  },
  getRequest: () => {
    const { realSport, region, league } = get().data;
    console.log({ realSport, region, league });

    if (!realSport || !region || !league) return undefined;

    let normalizedRealSport: RealSport | ExistingRealSport;
    if ("uuid" in realSport && realSport.uuid) {
      normalizedRealSport = { uuid: realSport.uuid };
    } else {
      const newSport = realSport as RealSport;
      normalizedRealSport = {
        description: newSport.description,
        short: newSport.short,
        preGameDelay: newSport.preGameDelay,
        liveDelay: newSport.liveDelay,
        enabled: newSport.enabled,
      };
    }

    let normalizedRegion: Region | ExistingRegion;
    if ("uuid" in region && region.uuid) {
      normalizedRegion = { uuid: region.uuid };
    } else {
      const newRegion = region as Region;
      normalizedRegion = {
        description: newRegion.description,
        order: newRegion.order,
        enabled: newRegion.enabled,
      };
    }

    return {
      realSport: normalizedRealSport,
      region: normalizedRegion,
      league,
    };
  },
  clearState: () => {
    set(() => {
      return {
        data: {
          realSport: undefined,
          region: undefined,
          league: undefined,
        },
        step: CreationStep.CreateSport,
      };
    });
  },
}));
