import { ScrollIndicator, toast } from '@components';
import Button from '@components/button';
import ConnectionStatus from '@components/connection-status';
import { useTheme } from '@theme';
import { useIsOnline } from 'hooks/use-is-online';
import React, { createElement } from 'react';
import { ScrollView } from 'react-native';
const View =
  require('react-native/Libraries/Components/View/ViewNativeComponent').default;
const Text = props => createElement('RCTText', props);
export const Welcome = function Welcome() {
  const { Fonts, Colors } = useTheme();
  const { isOnline } = useIsOnline();
  return (
    <View>
      <Text>Out line Button</Text>
      {Button().Outline({
        onPress: () =>
          toast.success('test', {
            backgroundColor: Colors.black,
            titleColor: Colors.white,
          }),
        children: (
          <View>
            <Text>Demo Custom Toast</Text>
          </View>
        ),
      })}
      <ConnectionStatus connected={isOnline} />
      {/* <ScrollIndicator>
        {new Array(100).fill(0).map((_, i) => (
          <View key={`key-${i}`}>
            <Text>{i}</Text>
          </View>
        ))}
      </ScrollIndicator> */}
    </View>
  );
};
