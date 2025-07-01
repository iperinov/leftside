import { create } from "zustand";
import type { League, LeagueRegion, RealSport } from "~/api/ocs/ocs.types";

type ExistingEntity = {
  uuid: string;
};

export type CreateLeagueRequest = {
  realSport: RealSport | ExistingEntity;
  region: LeagueRegion | ExistingEntity;
  league: League;
};

export type CreateLeagueData = Partial<CreateLeagueRequest>;

export enum CreationStep {
  Invalid = 0,
  CreateSport = 1,
  SelectRegion = 2,
  CreateRegion = 3,
  CreateLeague = 4,
  Confirm = 5,
  Final = 6,
}

interface LeagueStore {
  data: CreateLeagueData;
  step: CreationStep;
  setSport: (cofig: RealSport | ExistingEntity) => void;
  setSportRegion: (cofig: RealSport | ExistingEntity) => void;
  setRegion: (cofig: LeagueRegion | ExistingEntity) => void;
  setSelectRegion: (cofig: LeagueRegion | ExistingEntity) => void;
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
        step: CreationStep.CreateRegion,
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
    const config = get().data;
    console.log(config);
    if (config.realSport && config.region && config.league)
      return {
        realSport: config.realSport,
        region: config.region,
        league: config.league,
      };
    return undefined;
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
