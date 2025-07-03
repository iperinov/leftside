import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Disable refetching on window focus
      //refetchOnWindowFocus: false,

      // Disable refetching on mount or reconnect
      //refetchOnMount: false,
      //refetchOnReconnect: false,

      // Never expire 
      staleTime: Infinity,

      // Cache forever
      gcTime: Infinity,
    },
  },
});


