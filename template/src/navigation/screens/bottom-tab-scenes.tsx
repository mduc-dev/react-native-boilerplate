import { bottomTabScreens } from '@navigation/config/routes';
import { BottomTabRoutes, ScreenOptions } from '@navigation/config/types';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import React from 'react';

const Tab = createBottomTabNavigator<BottomTabRoutes>();

const BottomTabScenes = () => {
  const screenOptions: ScreenOptions<
    BottomTabRoutes,
    BottomTabNavigationOptions
  > = {
    Home: {
      tabBarLabel: 'Home',
      tabBarShowLabel: false,
    },
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarAllowFontScaling: false,
        headerShown: false,
      }}
    >
      {bottomTabScreens.map(({ name, component }: any) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={screenOptions[name]}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabScenes;
