import { DefaultTheme } from '@react-navigation/native';
import { Fonts } from './fonts';
import Colors from './colors';

export const useTheme = () => {
  return {
    Colors,
    Fonts,
    NavigationTheme: {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        ...Colors,
      },
    },
  };
};
