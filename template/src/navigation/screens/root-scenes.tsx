import {
  commonScreens,
  userScreens,
  notLoggedInScreens,
} from '@navigation/config/routes';
import { RootStackRoutes, screenOptions } from '@navigation/config/types';
import { createStackNavigator } from '@react-navigation/stack';
import { useNetWorkConnection } from 'hooks/use-network-connection';
import React from 'react';

const { Navigator, Group, Screen } = createStackNavigator<RootStackRoutes>();

export const RootScenes = () => {
  useNetWorkConnection();
  const isAuth = false;

  return (
    <Navigator>
      <Group screenOptions={{}}>
        {Object.entries({
          ...commonScreens,
          ...(isAuth ? userScreens : notLoggedInScreens),
        }).map(([name, component]: any) => (
          <Screen
            key={name}
            name={name}
            component={component}
            options={screenOptions[name]}
          />
        ))}
      </Group>
    </Navigator>
  );
};
