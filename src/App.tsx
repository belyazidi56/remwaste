import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SkipSelection } from './components/SkipSelection';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SkipSelection />
    </QueryClientProvider>
  );
}

export default App;