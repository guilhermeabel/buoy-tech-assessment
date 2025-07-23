import {
  QueryClient as BaseQueryClient,
  QueryClientProvider as BaseQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new BaseQueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  },
});

interface QueryClientProps {
  children: JSX.Element | JSX.Element[];
}

export function QueryClientProvider({ children }: QueryClientProps) {
  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </BaseQueryClientProvider>
  );
}
