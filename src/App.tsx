import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.js';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

// Handle 404.html redirect for SPA routing on GitHub Pages
function useRedirectFromNotFound() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('p');

    if (redirect) {
      // Clean up the URL by removing the redirect parameter
      window.history.replaceState(null, '', redirect);
    }
  }, []);
}

function AppContent() {
  useRedirectFromNotFound();

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/ghcp-car-challenge">
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
