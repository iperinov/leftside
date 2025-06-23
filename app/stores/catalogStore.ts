import { create } from "zustand";

interface CatalogStore {
  expandedIds: Set<string>;
  isExpanded: (id: string) => boolean;
  toggleExpanded: (id: string) => void;
  expand: (id: string) => void;
  collapse: (id: string) => void;
}

export const useCatalogStore = create<CatalogStore>((set, get) => ({
  expandedIds: new Set(),

  isExpanded: (id) => get().expandedIds.has(id),

  toggleExpanded: (id) =>
    set((state) => {
      const next = new Set(state.expandedIds);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { expandedIds: next };
    }),

  expand: (id) =>
    set((state) => ({
      expandedIds: new Set(state.expandedIds).add(id),
    })),

  collapse: (id) =>
    set((state) => {
      const next = new Set(state.expandedIds);
      next.delete(id);
      return { expandedIds: next };
    }),
}));
