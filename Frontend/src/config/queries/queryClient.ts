import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Made to avoid spamming the server
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default queryClient;
