import type { QueryClient } from "@tanstack/react-query";
import type TreeItemData from "~/components/tree/TreeItemData";

export function cleanOptimisticUpdates<T extends TreeItemData<T>>(queryClient: QueryClient, queryKey: readonly string[], idsToClean: [string], onComplete?: () => void) {
    if (idsToClean.length <= 0) return;
    const current = queryClient.getQueryData<T[]>(queryKey);
    if (current) {
        const updated = structuredClone(current);
        for (const id of idsToClean) {
            const item = updated.find((item) => item.id === id);
            if (item) {
                item.pending = false;
                queryClient.setQueryData(queryKey, updated);
            }
        }   
    }
    onComplete?.();
}