import { Text, View } from 'react-native';

type ViewStyle = React.ComponentProps<typeof View>['style'];
type TextStyle = React.ComponentProps<typeof Text>['style'];
export type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'primary' | 'secondary' | 'delete' | 'tertiary' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
};
