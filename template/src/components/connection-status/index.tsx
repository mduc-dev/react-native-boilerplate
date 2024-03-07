import React, { useState, useEffect, useRef, memo } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

const CONNECTION_RETRY = ['.', '..', '...'];

const ConnectionStatus = memo(
  ({
    connected,
    duration = 200,
  }: {
    connected: boolean;
    duration?: number;
  }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const loseConnectionTimeCount = useRef(0);
    const connectionInterval = useRef(null);

    useEffect(() => {
      if (connected !== undefined) {
        // Check if connected prop has changed
        if (!isAnimating) {
          setIsAnimating(true);
          Animated.timing(animatedValue, {
            toValue: connected ? 1 : 0,
            duration,
            useNativeDriver: true, // Optimize for better performance
          }).start(() => {
            setIsAnimating(false);
          });
        }

        if (!connected) {
          if (connectionInterval.current) {
            clearInterval(connectionInterval.current);
          }
          connectionInterval.current = setInterval(() => {
            loseConnectionTimeCount.current =
              (loseConnectionTimeCount.current + 1) % 3;
            // Update the component without re-rendering unnecessarily
          }, 1000);
        } else if (connectionInterval.current) {
          clearInterval(connectionInterval.current);
          connectionInterval.current = null;
        }
      }
    }, [connected]);

    const title = connected ? 'Connected' : 'Disconnected';

    return (
      <Animated.View
        style={{
          ...styles.container,
          // transform: [
          //   {
          //     translateY: animatedValue.interpolate({
          //       inputRange: [0, 1],
          //       outputRange: [35, 0], // Reverse for translateY
          //     }),
          //   },
          // ],

          backgroundColor: connected ? '#78ca32' : '#fa8613',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.title}>{title}</Text>
        {!connected && (
          <Text style={styles.dots}>
            {CONNECTION_RETRY[loseConnectionTimeCount.current]}
          </Text>
        )}
      </Animated.View>
    );
  },
  (prevProps, nextProps) => prevProps.connected === nextProps.connected,
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  dots: {
    color: 'white',
  },
});

export default ConnectionStatus;
