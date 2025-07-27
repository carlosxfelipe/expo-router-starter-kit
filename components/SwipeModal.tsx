import React, { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  Modal,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_CLOSE_THRESHOLD = 100;

type SwipeModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdropPress?: boolean;
  enableSwipeToClose?: boolean;
  maxHeight?: number | "auto";
  defaultHeight?: number;
  bgColor?: string;
  showBar?: boolean;
  barColor?: string;
  headerComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
};

const SwipeModal: React.FC<SwipeModalProps> = ({
  visible,
  onClose,
  children,
  closeOnBackdropPress = true,
  enableSwipeToClose = true,
  maxHeight = "auto",
  defaultHeight,
  bgColor = "#fff",
  showBar = true,
  barColor = "#ccc",
  headerComponent,
  footerComponent,
}) => {
  const initialHeight = typeof maxHeight === "number"
    ? Math.min(maxHeight, SCREEN_HEIGHT)
    : defaultHeight || SCREEN_HEIGHT * 0.9;

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const containerHeight = useRef(initialHeight).current;

  const hideModal = useCallback(() => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start(onClose);
  }, [translateY, onClose]);

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT - containerHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      translateY.setValue(SCREEN_HEIGHT);
    }
  }, [visible, translateY, containerHeight]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        enableSwipeToClose && gesture.dy > 10,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          translateY.setValue(SCREEN_HEIGHT - containerHeight + gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > SWIPE_CLOSE_THRESHOLD) {
          hideModal();
        } else {
          Animated.spring(translateY, {
            toValue: SCREEN_HEIGHT - containerHeight,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableWithoutFeedback
        onPress={() => closeOnBackdropPress && hideModal()}
      >
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.container,
          {
            height: containerHeight,
            transform: [{ translateY }],
            backgroundColor: bgColor,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflow: "hidden",
          },
        ]}
        {...(enableSwipeToClose ? panResponder.panHandlers : {})}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            {showBar && (
              <View style={styles.barContainer}>
                <View style={[styles.bar, { backgroundColor: barColor }]} />
              </View>
            )}
            {headerComponent}
            <View style={styles.body}>{children}</View>
            {footerComponent}
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "#00000088",
  },
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  barContainer: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    width: 40,
    height: 5,
    borderRadius: 3,
  },
  body: {
    flex: 1,
    padding: 16,
  },
});

export default SwipeModal;
