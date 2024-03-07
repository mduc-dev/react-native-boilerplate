import {
  ParamListBase,
  RouteConfig,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

export type RootStackRoutes = {
  Welcome: NavigatorScreenParams<{ text: string }>;
  BottomTab: NavigatorScreenParams<BottomTabRoutes>;
};

export type BottomTabRoutes = {
  Home: undefined;
};

export type RouteNames = keyof RootStackRoutes;

export type ScreenOptions<T extends ParamListBase, K extends {}> = {
  [screenName: string]: RouteConfig<T, keyof T, any, K, any>['options'];
};

export function createEnum<T extends { [P in keyof T]: P }>(o: T) {
  return o;
}
export const screenOptions: ScreenOptions<
  RootStackRoutes,
  StackNavigationOptions
> = {
  Welcome: { headerShown: true },
  BottomTab: { headerShown: false },
};
