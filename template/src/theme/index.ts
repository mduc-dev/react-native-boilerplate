import { DefaultTheme } from '@react-navigation/native';
import Colors from './colors';
import Fonts from './fonts';
import Layout from './layout';

export const useTheme = () => {
  return {
    Colors,
    Fonts,
    Layout,
    NavigationTheme: {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        ...Colors,
      },
    },
  };
};
