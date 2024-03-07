import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@theme';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'react-native';
import { RootScenes } from './root-scenes';
import { navigationRef } from '@navigation/config/navigation-service';

require('dayjs/locale/en');

const MainNavigation = () => {
  const { i18n } = useTranslation();
  const { NavigationTheme } = useTheme();
  return (
    <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
      <StatusBar barStyle="dark-content" />
      <RootScenes />
    </NavigationContainer>
  );
};

export default MainNavigation;
