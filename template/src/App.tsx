import '@i18n';
import React from 'react';
import MainNavigation from '@navigation/screens';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <MainNavigation />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};
export default App;
