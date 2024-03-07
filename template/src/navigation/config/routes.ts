import { BottomTab, Welcome } from '@features';

/**
 * Common screens
 */
export const commonScreens = {
  // BottomTab: BottomTabNavigation,
};

/**
 * Screens when user logged in
 */
export const userScreens = {};

/**
 * Screens user when user not logged in
 */
export const notLoggedInScreens = {
  WelCome: Welcome,
};

/**
 * Modal
 */
export const notLoggedInModalSlides = {};
export const userModalSlides = {};
export const commonModalSlides = {};

/**
 * Bottom Tab
 */
export const bottomTabScreens = [{ component: BottomTab.Home, name: 'Home' }];
