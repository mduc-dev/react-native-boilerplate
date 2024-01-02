import '@i18n';
import React from 'react';
import MainNavigation from '@navigation/scenes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <MainNavigation />
    </SafeAreaProvider>
  );
};
export default App;
