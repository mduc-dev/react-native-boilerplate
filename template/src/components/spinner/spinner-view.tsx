import Svg, { Circle } from 'react-native-svg';
import { SpinnerProps, spinnerSizeMap } from './type';
import Colors from '@theme/colors';

export const SpinnerView = ({
  size = 'medium',
  color = Colors.violet[500],
  secondaryColor: secondaryColorProp,
}: SpinnerProps) => {
  const secondaryColor = secondaryColorProp
    ? secondaryColorProp
    : Colors.gray[100];

  return (
    <Svg
      width={spinnerSizeMap.get(size) ?? 32}
      height={spinnerSizeMap.get(size) ?? 32}
      viewBox="0 0 32 32"
    >
      <Circle
        cx={16}
        cy={16}
        fill="none"
        r={14}
        strokeWidth={4}
        stroke={secondaryColor}
      />
      <Circle
        cx={16}
        cy={16}
        fill="none"
        r={14}
        strokeWidth={4}
        stroke={color}
        strokeDasharray={80}
        strokeDashoffset={56}
      />
    </Svg>
  );
};
