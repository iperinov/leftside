import { create } from "zustand";
import type { Configuration } from "~/api/cdb/cdb.types";

interface ConfigState {
  configurations: Configuration[];
  loading: boolean;
  //fetchConfigurations: () => Promise<void>;
  //addConfiguration: (config: Configuration) => void;
  editConfiguration: (config: Configuration) => void;
  //renameConfiguration: (config: Configuration) => void;
  //duplicateConfiguration: (config: Configuration) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  configurations: [],
  loading: true,
  //   fetchConfigurations: async () => {
  //     try {
  //       set({ loading: true });

  //       // TODO: Uncomment and Implement
  //       //const res = await fetch('/configurations');
  //       //const data: Configuration[] = await res.json();

  //       //TODO: Remove after implimentation
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //       const data: Configuration[] = [
  //         {
  //         "id": "1",
  //         "title": "Default",
  //         "assignedBooks": ["Book7", "Book8", "Book9", "Book10", "Book11"],
  //         "lastUpdated": "2025-04-09T15:42:00Z",
  //         "lastModified": "username1"
  //         },
  //         {
  //         "id": "2",
  //         "title": "BC_PS_BO_TC",
  //         "assignedBooks": ["Book1", "Book5", "Book6"],
  //         "lastUpdated": "2025-04-09T15:42:00Z",
  //         "lastModified": "username2"
  //         },
  //         {
  //         "id": "3",
  //         "title": "Configuration Alpha",
  //         "assignedBooks": ["Book2"],
  //         "lastUpdated": "2025-04-09T15:42:00Z",
  //         "lastModified": "username3"
  //         },
  //         {
  //         "id": "4",
  //         "title": "Configuration Beta",
  //         "assignedBooks": ["Book3"],
  //         "lastUpdated": "2025-04-09T15:42:00Z",
  //         "lastModified": "username4"
  //         },
  //         {
  //         "id": "5",
  //         "title": "Configuration Gamma",
  //         "assignedBooks": ["Book4"],
  //         "lastUpdated": "2025-04-09T15:42:00Z",
  //         "lastModified": "username5"
  //         },
  //       ]

  //       set({ configurations: data, loading: false });
  //     } catch (error) {
  //       console.error('Failed to fetch configurations:', error);
  //       set({ configurations: [], loading: false });
  //     }
  //   },
  // addConfiguration: (config) =>
  //   set((state) => ({
  //     configurations: [...state.configurations, config],
  //   })),
  editConfiguration: (config) =>
    set((state) => ({
      configurations: state.configurations.map((cfg) =>
        cfg.uuid === config.uuid
          ? {
              ...cfg,
              name: config.name,
              lmt: config.lmt,
              books: config.books,
            }
          : cfg,
      ),
    })),
  // renameConfiguration: (config) =>
  //   set((state) => ({
  //     configurations: state.configurations.map((cfg) =>
  //       cfg.id === config.id ? {
  //           ...cfg,
  //           name: config.name,
  //           lastUpdated: config.lastUpdated
  //       } : cfg
  //     ),
  //   })),
  // duplicateConfiguration: (config) =>
  //   set((state) => ({
  //     configurations: [...state.configurations, config],
  //   })),
}));
