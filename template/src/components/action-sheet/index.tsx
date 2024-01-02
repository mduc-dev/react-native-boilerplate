import { useTheme } from '@theme';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Keyboard,
  Modal,
  ModalProps,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { mix } from 'react-native-redash';

interface ActionSheetButton {
  text: string;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
}

const DEVICE_HEIGHT = Dimensions.get('window').height;

interface ActionSheetProps extends ModalProps {
  isVisible: boolean;
  onBackdropPress?: () => void;
  headerTitle?: string;
  buttons?: ActionSheetButton[];
  onPressCancel?: () => void;
  cancelText?: string;
  cancelTextStyle?: StyleProp<TextStyle>;
  CustomContentComponent?: React.ReactNode;
}

const actionSheetTimingConfig = {
  easing: Easing.inOut(Easing.quad),
  duration: 250,
};

const ActionSheet: React.FC<ActionSheetProps> = props => {
  const { t } = useTranslation('Common');
  const { Colors } = useTheme();
  const {
    buttons,
    headerTitle,
    isVisible,
    onBackdropPress,
    onPressCancel,
    cancelTextStyle,
    cancelText,
    children,
    ...rest
  } = props;

  const [isShow, setIsShow] = useState(false);

  const translateY = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      setIsShow(true);
      Keyboard.dismiss();
      translateY.value = withTiming(1, actionSheetTimingConfig);
    } else {
      translateY.value = withTiming(0, actionSheetTimingConfig, () =>
        runOnJS(setIsShow)(false),
      );
    }
  }, [isVisible, translateY]);

  const contentContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: mix(translateY.value, DEVICE_HEIGHT, 0),
        },
      ],
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: mix(translateY.value, 0, 0.4),
    };
  });

  const _renderActions = (item: ActionSheetButton, index: number) => {
    return (
      <View
        key={index}
        style={{ borderTopColor: '#8F8F8F', borderTopWidth: 1 }}
      >
        <Pressable style={{ borderRadius: 14 }} onPress={item.onPress}>
          <Text
            style={[
              { color: '#0A7AFF', fontSize: 18, fontWeight: 'bold' },
              item.textStyle,
            ]}
          >
            {item.text}
          </Text>
        </Pressable>
      </View>
    );
  };

  const _onPressBackdrop = () => {
    if (onBackdropPress) {
      return onBackdropPress();
    }
    onPressCancel && onPressCancel();
  };

  return (
    <Modal {...rest} transparent visible={isShow}>
      <View style={StyleSheet.absoluteFillObject}>
        <TouchableWithoutFeedback onPress={_onPressBackdrop}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              styles.overlay,
              overlayStyle,
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          pointerEvents="box-none"
          style={[styles.container, contentContainerStyle]}
        >
          <View style={[styles.contentContainer, { paddingBottom: 16 }]}>
            {children ? (
              children
            ) : (
              <ScrollView bounces={false} style={styles.scrollView}>
                {headerTitle && (
                  <Text
                    style={{
                      padding: 14,
                      color: '#8F8F8F',
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}
                  >
                    {headerTitle}
                  </Text>
                )}
                {buttons && <View>{buttons.map(_renderActions)}</View>}
              </ScrollView>
            )}
            <View style={{ marginTop: 8 }}>
              <Pressable
                onPress={onPressCancel}
                style={{
                  padding: 12,
                  borderRadius: 14,
                  backgroundColor: '#F2F2F2',
                }}
              >
                <Text
                  style={[
                    { color: '#0A7AFF', fontSize: 18, fontWeight: 'bold' },
                    cancelTextStyle,
                  ]}
                >
                  {cancelText || t('cancel')}
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ActionSheet;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#000',
  },
  container: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  contentContainer: {
    maxHeight: '85%',
    width: '95%',
  },
  scrollView: {
    borderRadius: 14,
    backgroundColor: '#edededcc',
  },
});
