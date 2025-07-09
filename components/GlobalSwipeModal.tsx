import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  DeviceEventEmitter,
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

export type GlobalSwipeModalProps = {
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

export const showModal = (props: GlobalSwipeModalProps) => {
  DeviceEventEmitter.emit("SHOW_GLOBAL_MODAL", props);
};

export const closeModal = () => {
  DeviceEventEmitter.emit("CLOSE_GLOBAL_MODAL");
};

const GlobalSwipeModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [modalProps, setModalProps] = useState<GlobalSwipeModalProps | null>(
    null
  );

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const containerHeight = useRef(SCREEN_HEIGHT * 0.9).current;

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
      (props: GlobalSwipeModalProps) => {
        setModalProps(props);
        setVisible(true);

        const height =
          typeof props.maxHeight === "number"
            ? Math.min(props.maxHeight, SCREEN_HEIGHT)
            : props.defaultHeight || SCREEN_HEIGHT * 0.9;

        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT - height,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );

    const closeListener = DeviceEventEmitter.addListener(
      "CLOSE_GLOBAL_MODAL",
      () => {
        hideModal();
      }
    );

    return () => {
      showListener.remove();
      closeListener.remove();
    };
  }, [translateY, hideModal]);

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
    })
  ).current;

  if (!visible || !modalProps) return null;

  const {
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
  } = modalProps;

  const modalHeight =
    typeof maxHeight === "number"
      ? Math.min(maxHeight, SCREEN_HEIGHT)
      : defaultHeight || SCREEN_HEIGHT * 0.9;

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
            height: modalHeight,
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

export default GlobalSwipeModal;
