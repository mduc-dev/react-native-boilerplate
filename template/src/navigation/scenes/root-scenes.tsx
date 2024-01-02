import {
  commonScreens,
  userScreens,
  notLoggedInScreens,
} from '@navigation/config/routes';
import { RootStackRoutes, screenOptions } from '@navigation/config/types';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@theme';

const { Navigator, Group, Screen } = createStackNavigator<RootStackRoutes>();

export const RootScenes = () => {
  const { Colors, Fonts } = useTheme();

  const isAuth = false;

  return (
    <Navigator>
      <Group>
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
