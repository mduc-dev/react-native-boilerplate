import { useEffect } from 'react';

import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  withRepeat,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { SpinnerView } from './spinner-view';
import { SpinnerProps, getSpinnerSize } from './type';

export const Spinner = ({ size, duration = 750, ...rest }: SpinnerProps) => {
  const transition = useSharedValue(0);

  useEffect(() => {
    transition.value = withRepeat(
      withTiming(360, { duration, easing: Easing.linear }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: transition.value + 'deg' }],
    };
  }, []);

  return (
    <Animated.View
      style={[
        { height: getSpinnerSize(size), width: getSpinnerSize(size) },
        animatedStyle,
      ]}
      role="progressbar"
    >
      <SpinnerView size={size} {...rest} />
    </Animated.View>
  );
};
