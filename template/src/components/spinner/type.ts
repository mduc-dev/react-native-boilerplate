export const spinnerSizeMap = new Map<SpinnerProps['size'], number>([
  ['large', 48],
  ['medium', 32],
  ['small', 24],
]);
export const getSpinnerSize = (size: SpinnerProps['size']) => {
  return spinnerSizeMap.get(size) ?? 32;
};

export type SpinnerProps = {
  size?: 'large' | 'medium' | 'small';
  color?: string;
  secondaryColor?: string;
  duration?: number;
};
