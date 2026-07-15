import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../contexts/ThemeContext';

// Set up TanStack Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data remains fresh for 5 mins
      gcTime: 10 * 60 * 1000,    // Garbage collection takes 10 mins
      refetchOnWindowFocus: false, // Prevent redundant requests on returning to tab
      retry: 1,                  // Auto retry once on failure
    },
  },
});

export const ThemeQueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
