import React, { PropsWithChildren, memo, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

const INDICATOR_WIDTH = 24;
const INDICATOR_CONTAINER_WIDTH = 72;
const ScrollIndicator = memo(
  ({
    children,
    style,
  }: PropsWithChildren & { style?: StyleProp<ViewStyle> }) => {
    const [left, setLeft] = useState(0);
    const [scrollviewWidth, setScrollviewWidth] = useState(0);
    const [scrollContentWidth, setScrollContentWidth] = useState(0);
    const translateX = () => {
      const value = Math.max(
        0,
        Math.min(
          INDICATOR_CONTAINER_WIDTH - INDICATOR_WIDTH,
          left *
            ((INDICATOR_WIDTH - INDICATOR_CONTAINER_WIDTH) /
              (scrollviewWidth - scrollContentWidth)) || 0,
        ),
      );

      return value;
    };

    const onLayout = (e: LayoutChangeEvent, callback: Function) => {
      callback(e.nativeEvent.layout.width);
    };

    return (
      <View style={[style, styles.container]}>
        <Animated.ScrollView
          onScroll={e => setLeft(e.nativeEvent.contentOffset.x)}
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.scrollView}
          onLayout={e => onLayout(e, setScrollviewWidth)}
        >
          <View
            style={{ flexDirection: 'row' }}
            onLayout={e => onLayout(e, setScrollContentWidth)}
          >
            {children}
          </View>
        </Animated.ScrollView>

        <View style={styles.indicatorContainer}>
          <Animated.View
            style={[
              styles.indicator,
              { transform: [{ translateX: translateX() }] },
            ]}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  indicator: {
    width: 24,
    height: 4,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  indicatorContainer: {
    width: 72,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  scrollView: { marginBottom: 10 },
  container: {
    alignItems: 'center',
    width: '100%',
  },
});

export default ScrollIndicator;
