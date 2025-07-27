import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  DeviceEventEmitter,
  Dimensions,
  Keyboard,
  LayoutChangeEvent,
  Modal,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_CLOSE_THRESHOLD = 100;

export type GlobalSwipeModalProps = {
  children: React.ReactNode;
  closeOnBackdropPress?: boolean;
  enableSwipeToClose?: boolean;
  maxHeight?: number | "auto";
  bgColor?: string;
  showBar?: boolean;
  barColor?: string;
  headerComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
};

export const showModal = (props: GlobalSwipeModalProps) => {
  DeviceEventEmitter.emit("SHOW_GLOBAL_MODAL", props);
};

export const closeModal = () => {
  DeviceEventEmitter.emit("CLOSE_GLOBAL_MODAL");
};

const GlobalSwipeModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [modalProps, setModalProps] = useState<GlobalSwipeModalProps | null>(
    null,
  );
  const [containerHeight, setContainerHeight] = useState(SCREEN_HEIGHT * 0.9);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const hideModal = useCallback(() => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      setModalProps(null);
    });
  }, [translateY]);

  useEffect(() => {
    const showListener = DeviceEventEmitter.addListener(
      "SHOW_GLOBAL_MODAL",
      (props) => {
        setModalProps(props);
        setVisible(true);
      },
    );
    const closeListener = DeviceEventEmitter.addListener(
      "CLOSE_GLOBAL_MODAL",
      () => {
        hideModal();
      },
    );
    return () => {
      showListener.remove();
      closeListener.remove();
    };
  }, [hideModal]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    if (modalProps?.maxHeight === "auto") {
      const clamped = Math.min(height, SCREEN_HEIGHT);
      setContainerHeight(clamped);
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT - clamped,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    if (!visible || !modalProps) return;
    if (modalProps.maxHeight !== "auto") {
      const height = typeof modalProps.maxHeight === "number"
        ? Math.min(modalProps.maxHeight, SCREEN_HEIGHT)
        : SCREEN_HEIGHT * 0.9;
      setContainerHeight(height);
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT - height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, modalProps, translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        modalProps?.enableSwipeToClose !== false && gesture.dy > 10,
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

  if (!visible || !modalProps) return null;

  const {
    children,
    closeOnBackdropPress = true,
    enableSwipeToClose = true,
    bgColor = "#fff",
    showBar = true,
    barColor = "#ccc",
    headerComponent,
    footerComponent,
  } = modalProps;

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
          <View onLayout={handleLayout}>
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
    padding: 16,
  },
});

export default GlobalSwipeModal;
